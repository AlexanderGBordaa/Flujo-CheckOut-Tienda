import { Product, CartItem, Address, PaymentDetails } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'NikeCourt Lite 2',
    subtitle: "Men's Hard Court Tennis Shoe",
    price: 97.0,
    colors: ['Blue', 'White', 'Black'],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    estimatedDelivery: 'Arrives by April 3 to April 5th',
  },
  {
    id: 'prod-2',
    title: 'Wilson Hammer 5.3',
    subtitle: 'Adult Tennis Racket',
    price: 50.45,
    originalPrice: 69.95,
    colors: ['Black', 'Silver', 'White'],
    sizes: ['2-1/4', '4-1/4', '4-3/8', '4-1/2'],
    image: 'https://images.unsplash.com/photo-1617083934555-563d415b3c58?w=400&auto=format&fit=crop&q=80',
    estimatedDelivery: 'Arrives by April 3 to April 5th',
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-item-1',
    product: INITIAL_PRODUCTS[0],
    selectedColor: 'Blue',
    selectedSize: '37',
    quantity: 1,
  },
  {
    id: 'cart-item-2',
    product: INITIAL_PRODUCTS[1],
    selectedColor: 'Black',
    selectedSize: '2-1/4',
    quantity: 1,
  },
];

export const INITIAL_SAVED_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Elena Olson',
    countryCode: '+49',
    phone: '179 111 1010',
    email: 'elena@kanaelsen.com',
    addressTitle: 'My Office',
    street1: 'Altenauer Str. 35',
    street2: '',
    city: 'Clausthal-Zellerfeld',
    country: 'Germany',
    isSameAsDelivery: true,
    billingType: 'Personal',
  },
  {
    id: 'addr-2',
    fullName: 'Elena Olson',
    countryCode: '+49',
    phone: '179 111 1010',
    email: 'elena@kanaelsen.com',
    addressTitle: 'Alice Blue',
    street1: 'Birkenallee 55, 30',
    street2: '',
    city: 'Clausthal-Zellerfeld',
    country: 'Germany',
    isSameAsDelivery: true,
    billingType: 'Personal',
  },
  {
    id: 'addr-3',
    fullName: 'Elena Olson',
    countryCode: '+49',
    phone: '179 111 1010',
    email: 'elena@kanaelsen.com',
    addressTitle: 'Home',
    street1: 'Liebnitzstraße 16, Wohnheim 8, No: 8X',
    street2: '',
    city: 'Clausthal-Zellerfeld',
    country: 'Germany',
    isSameAsDelivery: true,
    billingType: 'Personal',
  },
];

export const INITIAL_PAYMENT_DETAILS: PaymentDetails = {
  cardType: 'mastercard',
  cardHolder: 'Elena Olson',
  cardNumber: '5470 0004 0000 0000',
  expiryMonth: '12',
  expiryYear: '28',
  securityCode: '234',
  rememberCard: true,
};
