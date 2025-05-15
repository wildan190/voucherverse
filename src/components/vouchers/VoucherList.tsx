"use client";

import { useEffect, useState, useCallback } from 'react';
import type { Voucher } from '@/types';
import { VoucherCard } from './VoucherCard';
import { UserDetailsModal } from './UserDetailsModal';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, WifiOff } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const API_URL = "http://127.0.0.1:8000/api/home";

export function VoucherList() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchVouchers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setVouchers(data.data);
      } else {
        throw new Error(data.message || 'Failed to load vouchers: Invalid data format');
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Error Fetching Vouchers",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  const handleBuyNow = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  const handlePurchaseSuccess = () => {
    fetchVouchers(); // Re-fetch vouchers after successful purchase
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading vouchers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-8 max-w-2xl mx-auto">
        <WifiOff className="h-5 w-5" />
        <AlertTitle>Failed to Load Vouchers</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (vouchers.length === 0) {
    return (
      <Alert className="my-8 max-w-2xl mx-auto">
        <AlertTitle>No Vouchers Available</AlertTitle>
        <AlertDescription>Please check back later for new offers.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div id="voucher-list" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Best Vouchers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vouchers.map((voucher) => (
          <VoucherCard key={voucher.id} voucher={voucher} onBuyNow={handleBuyNow} />
        ))}
      </div>
      {selectedVoucher && (
        <UserDetailsModal
          voucher={selectedVoucher}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      )}
    </div>
  );
}
