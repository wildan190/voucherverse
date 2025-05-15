
"use client";

import type { Voucher } from "@/types";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, ShieldCheck, Clock } from "lucide-react";

interface VoucherCardProps {
  voucher: Voucher;
  onBuyNow: (voucher: Voucher) => void;
}

export function VoucherCard({ voucher, onBuyNow }: VoucherCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-in-out bg-gradient-to-br from-card to-background/80 rounded-xl overflow-hidden">
      <Link href={`/voucher/${voucher.id}`} className="flex flex-col flex-grow">
        <CardHeader className="pb-3 relative">
          <Badge 
            variant="destructive" 
            className="absolute top-4 right-4"
          >
            {voucher.size}
          </Badge>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <Tag className="mr-2 h-5 w-5" /> {voucher.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground pt-1 min-h-[40px]">{voucher.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center text-muted-foreground">
              <Clock className="mr-2 h-4 w-4 text-primary" />
              <strong>Duration:</strong>&nbsp;{voucher.duration} days
            </li>
            <li className="flex items-center">
               <Badge variant="default" className="text-lg font-bold bg-accent text-accent-foreground py-1 px-3">
                 Rp {voucher.price.toLocaleString()}
               </Badge>
            </li>
          </ul>
        </CardContent>
      </Link>
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent link navigation when button is clicked
            onBuyNow(voucher);
          }}
          disabled={voucher.isSold}
        >
          <ShieldCheck className="mr-2 h-4 w-4" /> {voucher.isSold ? 'Sold Out' : 'Buy Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
