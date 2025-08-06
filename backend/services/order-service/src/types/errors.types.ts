interface StripeRefundError  {
  error: {
    type: string;
    message: string;
    code?: string;
    param?: string;
    doc_url?: string; 
    decline_code?: string;
    payment_intent?: string;
  };
}

export {
    StripeRefundError
}