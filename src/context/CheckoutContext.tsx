import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, CartItem, Address, PaymentDetails, Order, CardType } from '../types';
import { INITIAL_CART_ITEMS, INITIAL_SAVED_ADDRESSES, INITIAL_PAYMENT_DETAILS } from '../data/mockData';

interface CheckoutContextType {
  cartItems: CartItem[];
  updateItemColor: (itemId: string, color: string) => void;
  updateItemSize: (itemId: string, size: string) => void;
  updateItemQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  resetCart: () => void;

  shippingAddress: Address;
  setShippingAddress: (address: Address) => void;
  savedAddresses: Address[];
  saveNewAddress: (address: Omit<Address, 'id'>) => Address;
  updateAddress: (address: Address) => void;

  paymentDetails: PaymentDetails;
  updatePaymentDetails: (details: Partial<PaymentDetails>) => void;
  setCardType: (type: CardType) => void;

  lastOrder: Order | null;
  placeOrder: () => Order;

  subtotal: number;
  shippingCost: number;
  total: number;
  itemCount: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(INITIAL_SAVED_ADDRESSES);
  const [shippingAddress, setShippingAddress] = useState<Address>(INITIAL_SAVED_ADDRESSES[2]); // Default to "Home"
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(INITIAL_PAYMENT_DETAILS);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Cart operations
  const updateItemColor = (itemId: string, color: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, selectedColor: color } : item))
    );
  };

  const updateItemSize = (itemId: string, size: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, selectedSize: size } : item))
    );
  };

  const updateItemQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const resetCart = () => {
    setCartItems(INITIAL_CART_ITEMS);
  };

  // Address operations
  const saveNewAddress = (addressData: Omit<Address, 'id'>): Address => {
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    setSavedAddresses((prev) => [newAddr, ...prev]);
    setShippingAddress(newAddr);
    return newAddr;
  };

  const updateAddress = (address: Address) => {
    setSavedAddresses((prev) => prev.map((a) => (a.id === address.id ? address : a)));
    if (shippingAddress.id === address.id) {
      setShippingAddress(address);
    }
  };

  // Payment operations
  const updatePaymentDetails = (details: Partial<PaymentDetails>) => {
    setPaymentDetails((prev) => ({ ...prev, ...details }));
  };

  const setCardType = (type: CardType) => {
    setPaymentDetails((prev) => ({ ...prev, cardType: type }));
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const shippingCost = 0.0; // Free shipping in Figma

  const total = useMemo(() => {
    return subtotal + shippingCost;
  }, [subtotal, shippingCost]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Place order
  const placeOrder = (): Order => {
    const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('es-AR')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GMT`;

    const newOrder: Order = {
      orderNumber: randomOrderNumber,
      placedAt: formattedDate,
      items: [...cartItems],
      shippingAddress: { ...shippingAddress },
      paymentDetails: { ...paymentDetails },
      subtotal,
      shippingCost,
      total,
    };

    setLastOrder(newOrder);
    return newOrder;
  };

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        updateItemColor,
        updateItemSize,
        updateItemQuantity,
        removeItem,
        resetCart,
        shippingAddress,
        setShippingAddress,
        savedAddresses,
        saveNewAddress,
        updateAddress,
        paymentDetails,
        updatePaymentDetails,
        setCardType,
        lastOrder,
        placeOrder,
        subtotal,
        shippingCost,
        total,
        itemCount,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
