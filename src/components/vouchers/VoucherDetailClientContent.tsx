
"use client";

import { useState } from 'react';
import type { Voucher } from '@/types';
import { UserDetailsModal } from './UserDetailsModal';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, ShieldCheck, Clock, CalendarDays, Package, Info } from "lucide-react";
import Image from 'next/image';

interface VoucherDetailClientContentProps {
  voucher: Voucher;
  onPurchaseSuccess: () => void; 
}

export function VoucherDetailClientContent({ voucher, onPurchaseSuccess }: VoucherDetailClientContentProps) {
  const [selectedVoucherForModal, setSelectedVoucherForModal] = useState<Voucher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => {
    setSelectedVoucherForModal(voucher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVoucherForModal(null);
  };
  
  const handleModalPurchaseSuccess = () => {
    handleCloseModal(); 
    onPurchaseSuccess(); 
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-xl rounded-xl overflow-hidden bg-card border border-border">
        <div className="relative w-full h-64 md:h-80">
          <Image 
            src={`https://placehold.co/800x400.png?text=${encodeURIComponent(voucher.name)}`} 
            alt={voucher.name} 
            fill // Changed from layout="fill"
            style={{objectFit:"cover"}} // Changed from objectFit="cover"
            data-ai-hint="voucher promotion"
            className="rounded-t-xl"
          />
           {voucher.isSold && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-t-xl">
              <Badge variant="destructive" className="text-2xl p-4 opacity-90">SOLD OUT</Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-primary flex items-center">
            <Tag className="mr-3 h-7 w-7 text-primary" /> {voucher.name}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            {voucher.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
            <div className="flex items-center p-2 bg-secondary/50 rounded-md">
              <Package className="mr-2 h-5 w-5 text-primary" />
              <strong>Size:</strong>&nbsp;<Badge variant="outline">{voucher.size}</Badge>
            </div>
            <div className="flex items-center p-2 bg-secondary/50 rounded-md">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              <strong>Duration:</strong>&nbsp;<Badge variant="outline">{voucher.duration} days</Badge>
            </div>
            <div className="flex items-center p-2 bg-secondary/50 rounded-md">
              <Info className="mr-2 h-5 w-5 text-primary" />
              <strong>Status:</strong>&nbsp;
              {voucher.isSold ? 
                <Badge variant="destructive" className="border-destructive text-destructive-foreground">Sold Out</Badge> : 
                <Badge className="bg-accent text-accent-foreground border-accent">Available</Badge>
              }
            </div>
             <div className="flex items-center md:col-span-2 mt-2">
               <Badge variant="default" className="text-2xl font-bold bg-accent text-accent-foreground py-2 px-4 shadow-md">
                 Rp {voucher.price.toLocaleString()}
               </Badge>
            </div>
          </div>
          
          {voucher.created_at && (
            <div className="text-xs text-muted-foreground pt-4 space-y-1 border-t border-border mt-4">
              <p className="flex items-center"><CalendarDays className="mr-2 h-4 w-4" /> Created: {new Date(voucher.created_at).toLocaleDateString()}</p>
              {voucher.updated_at && voucher.updated_at !== voucher.created_at && (
                 <p className="flex items-center"><CalendarDays className="mr-2 h-4 w-4" /> Last Updated: {new Date(voucher.updated_at).toLocaleDateString()}</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 shadow-md" 
            onClick={handleBuyNow}
            disabled={voucher.isSold}
          >
            <ShieldCheck className="mr-2 h-5 w-5" /> {voucher.isSold ? 'Sold Out' : 'Buy Now'}
          </Button>
        </CardFooter>
      </Card>

      {selectedVoucherForModal && (
        <UserDetailsModal
          voucher={selectedVoucherForModal}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onPurchaseSuccess={handleModalPurchaseSuccess}
        />
      )}
    </div>
  );
}
