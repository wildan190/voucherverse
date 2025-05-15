
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import type { Voucher, CreateOrderResponse, MidtransNotificationPayload } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import CryptoJS from 'crypto-js';
import { Loader2 } from 'lucide-react';

interface UserDetailsModalProps {
  voucher: Voucher | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchaseSuccess?: () => void;
}

const CREATE_ORDER_URL = "http://127.0.0.1:8000/api/create-order";
const NOTIFY_URL = "http://127.0.0.1:8000/api/midtrans-notification";
const MIDTRANS_SERVER_KEY = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "SB-Mid-server-HaqmE_7sA1VE4pvXr7lWmunu"; 

declare global {
  interface Window {
    snap?: {
      pay: (snapToken: string, options?: Record<string, any>) => void;
    };
  }
}

export function UserDetailsModal({ voucher, isOpen, onClose, onPurchaseSuccess }: UserDetailsModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMidtransScriptLoaded, setIsMidtransScriptLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (window.snap) {
      setIsMidtransScriptLoaded(true);
    } else {
      const intervalId = setInterval(() => {
        if (window.snap) {
          setIsMidtransScriptLoaded(true);
          clearInterval(intervalId);
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, []);
  
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      // isSubmitting is reset by Dialog's onOpenChange or when it's closed before Snap.
    }
  }, [isOpen]);

  if (!voucher) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name || !email) {
      toast({ title: "Validation Error", description: "Please fill in your name and email.", variant: "destructive" });
      return;
    }

    if (!isMidtransScriptLoaded || !window.snap) {
      toast({ title: "Payment Error", description: "Payment system is not ready. Please try again shortly.", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const orderResponse = await fetch(CREATE_ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voucher_id: voucher.id, name, email }),
      });

      const orderData: CreateOrderResponse = await orderResponse.json();

      if (orderData.success && orderData.snap_token && orderData.order) {
        const snapToken = orderData.snap_token;
        const orderNumber = orderData.order.order_number;
        const grossAmount = Math.floor(orderData.order.total_price);

        // Close this modal *before* initiating Snap payment.
        // This will trigger onOpenChange in Dialog, which also resets isSubmitting for this instance.
        onClose(); 

        // Add a delay to allow modal UI to animate out before initiating Snap payment
        setTimeout(() => {
          if (!window.snap) { // Re-check snap availability
            toast({ title: "Payment Error", description: "Payment system became unavailable.", variant: "destructive" });
            // setIsSubmitting(false) was handled by onOpenChange when modal closed.
            return;
          }

          window.snap.pay(snapToken, {
            onSuccess: async function (result: any) {
              toast({ title: "Payment Successful!", description: "Processing your voucher..." });
              
              const signatureKey = CryptoJS.SHA512(orderNumber + result.status_code + grossAmount + MIDTRANS_SERVER_KEY).toString(CryptoJS.enc.Hex);
              
              const notificationPayload: MidtransNotificationPayload = {
                order_id: orderNumber,
                transaction_status: "settlement",
                gross_amount: grossAmount,
                status_code: result.status_code,
                signature_key: signatureKey,
                transaction_id: result.transaction_id,
              };

              try {
                const notifyResponse = await fetch(NOTIFY_URL, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(notificationPayload),
                });
                const notifyData = await notifyResponse.json();

                if (notifyData.download_link) {
                  toast({ title: "Voucher Ready!", description: "Your voucher is being downloaded." });
                  window.location.href = notifyData.download_link;
                } else {
                  toast({ title: "Transaction Recorded", description: notifyData.message || "PDF not found, but transaction is complete.", variant: "default" });
                }
                onPurchaseSuccess?.();
              } catch (err) {
                toast({ title: "Notification Error", description: (err as Error).message || "Failed to send notification.", variant: "destructive" });
              }
            },
            onPending: function (result: any) {
              toast({ title: "Payment Pending", description: "Waiting for your payment.", variant: "default" });
            },
            onError: function (result: any) {
              toast({ title: "Payment Failed", description: "Please try again or contact support.", variant: "destructive" });
            },
            onClose: function () { // User closed the Snap popup manually
              toast({ title: "Payment Incomplete", description: "You closed the payment window before finishing.", variant: "default" });
            }
          });
        }, 300); // 300ms delay to match typical modal animation duration

      } else {
        toast({ title: "Order Creation Failed", description: orderData.message || "Could not create your order.", variant: "destructive" });
        setIsSubmitting(false); // Allow retry if order creation failed, modal stays open.
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message || "An unexpected error occurred.", variant: "destructive" });
      setIsSubmitting(false); // Allow retry if an unexpected error occurred, modal stays open.
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => {
        if (!openState) { // Dialog is closing
            onClose(); // Call the original onClose prop to update parent state
            setIsSubmitting(false); // Ensure submitting state is reset for this modal instance
        }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Your Details</DialogTitle>
          <DialogDescription>
            Provide your name and email to purchase the "{voucher.name}" voucher.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userName" className="text-right">
                Full Name
              </Label>
              <Input
                id="userName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userEmail" className="text-right">
                Email
              </Label>
              <Input
                id="userEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting || !isMidtransScriptLoaded} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

