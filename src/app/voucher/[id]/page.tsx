
"use client";

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import type { Voucher } from '@/types';
import { VoucherDetailClientContent } from '@/components/vouchers/VoucherDetailClientContent';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, WifiOff } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

// This function would ideally fetch voucher details on the server for metadata.
// For now, we'll use placeholder data or data derived from params for metadata.
// async function getVoucherForMetadata(id: string): Promise<Partial<Voucher> | null> {
//   try {
//     const response = await fetch(`http://127.0.0.1:8000/api/detail-voucher/${id}`);
//     if (!response.ok) return null;
//     const data = await response.json();
//     return data.success ? data.data : null;
//   } catch (error) {
//     console.error("Error fetching voucher for metadata:", error);
//     return null;
//   }
// }

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const voucherId = params.id;
  // const voucher = await getVoucherForMetadata(voucherId);

  // Using placeholders or data from params until server-side fetch is fully integrated here
  const voucherName = `Voucher ${voucherId}`; // Placeholder: use voucher.name if fetched
  const voucherDescription = `Purchase WiFi voucher ${voucherId} for fast internet. Check details and buy now.`; // Placeholder

  const parentOpenGraph = (await parent).openGraph || {};
  const siteName = parentOpenGraph.siteName || 'Latsubnet';

  const currentCanonicalUrl = (await parent).url;
  const metadataBase = (await parent).metadataBase!;

  // Base paths without locale prefix
  const basePath = `/voucher/${voucherId}`;
  const enPath = basePath;
  const idPath = `/id${basePath}`;

  return {
    title: `${voucherName} - ${siteName}`,
    description: voucherDescription,
    keywords: ['buy wifi voucher', `voucher ${voucherId}`, 'internet package details', 'latsubnet voucher', `beli voucher ${voucherId}`],
    alternates: {
      canonical: currentCanonicalUrl,
      languages: {
        'en': new URL(enPath, metadataBase).toString(),
        'id': new URL(idPath, metadataBase).toString(),
        'x-default': new URL(enPath, metadataBase).toString(),
      },
    },
  };
}


export default function VoucherDetailPage() {
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
