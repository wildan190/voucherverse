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
  onPurchaseSuccess?: () => void; // Added callback for successful purchase
}

// It's good practice to use environment variables for keys
const CREATE_ORDER_URL = "http://127.0.0.1:8000/api/create-order";
const NOTIFY_URL = "http://127.0.0.1:8000/api/midtrans-notification";
const MIDTRANS_SERVER_KEY = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "SB-Mid-server-HaqmE_7sA1VE4pvXr7lWmunu"; 

// Declare snap on window type
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
    // Check if Midtrans Snap.js is loaded
    if (window.snap) {
      setIsMidtransScriptLoaded(true);
    } else {
      // Poll for Snap.js availability, as next/script onLoad might not be perfectly synced for immediate use
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
      // setIsSubmitting(false); // Keep this commented out, as Midtrans callbacks handle submission state
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
              onPurchaseSuccess?.(); // Call the success callback
            } catch (err) {
              toast({ title: "Notification Error", description: (err as Error).message || "Failed to send notification.", variant: "destructive" });
            }
            setIsSubmitting(false);
            onClose();
          },
          onPending: function (result: any) {
            toast({ title: "Payment Pending", description: "Waiting for your payment.", variant: "default" });
            setIsSubmitting(false);
            onClose();
          },
          onError: function (result: any) {
            toast({ title: "Payment Failed", description: "Please try again or contact support.", variant: "destructive" });
            setIsSubmitting(false);
            onClose();
          },
          onClose: function () {
            // Only show "Payment Closed" if not already handled by onSuccess, onPending, or onError
            // Check a flag or if the modal is still considered "submitting" by the parent
            // For simplicity, we'll rely on isSubmitting state here, though a more robust solution might involve more state.
            if (!isSubmitting) { 
                 toast({ title: "Payment Closed", description: "You closed the payment window.", variant: "default" });
            }
            // Ensure isSubmitting is false if the window is closed prematurely by the user
            // without a success/pending/error callback firing (e.g. user closes browser tab for midtrans)
            // however, our onClose from Dialog will handle this better.
            // setIsSubmitting(false); // This might be redundant if onClose() in Dialog always sets it.
          }
        });
      } else {
        toast({ title: "Order Creation Failed", description: orderData.message || "Could not create your order.", variant: "destructive" });
        setIsSubmitting(false);
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message || "An unexpected error occurred.", variant: "destructive" });
      setIsSubmitting(false);
    } 
    // `finally` block removed here as `setIsSubmitting(false)` and `onClose()` are now handled within Midtrans callbacks or error catches.
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
            onClose();
            setIsSubmitting(false); // Reset submitting state when dialog is closed externally
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
