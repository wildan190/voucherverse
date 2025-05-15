
"use client";

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import type { Voucher } from '@/types';
import { VoucherDetailClientContent } from '@/components/vouchers/VoucherDetailClientContent';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, WifiOff } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function VoucherClientPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchVoucherDetail = useCallback(async () => {
    if (!id) {
      setError("Voucher ID is missing.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/detail-voucher/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.data) {
        const fetchedVoucher = {
          ...data.data,
          price: parseFloat(data.data.price) || 0, 
        };
        setVoucher(fetchedVoucher);
      } else {
        throw new Error(data.message || 'Failed to load voucher details: Invalid data format');
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Error Fetching Voucher",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchVoucherDetail();
  }, [fetchVoucherDetail]);
  
  const handlePurchaseSuccessOnDetailPage = () => {
    fetchVoucherDetail();
    toast({
      title: "Purchase Successful!",
      description: "Your voucher details may have been updated.",
    });
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-10">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading voucher details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <Alert variant="destructive" className="my-8 max-w-2xl">
          <WifiOff className="h-5 w-5" />
          <AlertTitle>Failed to Load Voucher Details</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!voucher) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <Alert className="my-8 max-w-2xl">
          <AlertTitle>Voucher Not Found</AlertTitle>
          <AlertDescription>The voucher you are looking for does not exist or could not be loaded.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <VoucherDetailClientContent voucher={voucher} onPurchaseSuccess={handlePurchaseSuccessOnDetailPage} />
  );
}
