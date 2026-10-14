export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  colors: string[];
  sizes: string[];
  image: string;
  estimatedDelivery?: string;
}

export interface CartItem {
  id: string; // unique item instance id in cart
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  countryCode: string;
  phone: string;
  email: string;
  addressTitle: string; // e.g. "Home", "My Office"
  street1: string;
  street2?: string;
  city: string;
  country: string;
  isSameAsDelivery: boolean;
  billingType: 'Personal' | 'Commercial';
}

export type CardType = 'visa' | 'mastercard' | 'amex' | 'other';

export interface PaymentDetails {
  cardType: CardType;
  cardHolder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  securityCode: string;
  rememberCard: boolean;
}

export interface Order {
  orderNumber: string;
  placedAt: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentDetails: PaymentDetails;
  subtotal: number;
  shippingCost: number;
  total: number;
}

export type RootStackParamList = {
  ShoppingCart: undefined;
  SecurePayment: undefined;
  AddAddress: { addressToEdit?: Address } | undefined;
  SavedAddresses: undefined;
  OrderConfirmation: { order: Order };
};
