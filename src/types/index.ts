export interface Voucher {
  id: string;
  name: string;
  description: string;
  size: string; // e.g., "10 GB"
  duration: number; // e.g., 30 (days)
  price: number; // Ensure this is consistently a number
  isSold?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrderData {
  voucher_id: string;
  name: string;
  email: string;
}

export interface CreateOrderResponse {
  success: boolean;
  snap_token?: string;
  order?: {
    order_number: string;
    total_price: number;
  };
  message?: string;
}

export interface MidtransNotificationPayload {
  order_id: string;
  transaction_status: string;
  gross_amount: number;
  status_code: string;
  signature_key: string;
  transaction_id: string;
}

export interface MidtransNotificationResponse {
  download_link?: string;
  message?: string;
}
