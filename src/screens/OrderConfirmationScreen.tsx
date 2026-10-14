import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { useCheckout } from '../context/CheckoutContext';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
import { DeliveryBanner } from '../components/DeliveryBanner';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

export const OrderConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { order } = route.params;
  const { resetCart } = useCheckout();

  const handleBackToShopping = () => {
    resetCart();
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Order Confirmation</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Success Checkmark & Thank you message */}
        <View style={styles.successBlock}>
          <View style={styles.checkmarkCircle}>
            <Ionicons name="checkmark" size={36} color="#FFF" />
          </View>
          <Text style={styles.thankYouText}>Thank you!</Text>
          <Text style={styles.orderNumberText}>
            Your order <Text style={styles.orderNumberHighlight}>#{order.orderNumber}</Text> has been placed.
          </Text>
          <Text style={styles.emailNotificationText}>
            We sent an email to <Text style={{ fontWeight: '600' }}>{order.shippingAddress.email}</Text> with your order confirmation and bill.
          </Text>
          <Text style={styles.timePlacedText}>Time placed: {order.placedAt}</Text>
        </View>

        {/* Shipping Block */}
        <View style={styles.infoCard}>
          <Text style={styles.cardHeading}>Shipping</Text>
          <Text style={styles.personName}>{order.shippingAddress.fullName}</Text>
          <Text style={styles.contactDetails}>
            {order.shippingAddress.email}
          </Text>
          <Text style={styles.contactDetails}>
            {order.shippingAddress.countryCode} {order.shippingAddress.phone}
          </Text>
          <Text style={styles.addressDetails}>
            {order.shippingAddress.street1}
          </Text>
          <Text style={styles.addressDetails}>
            {order.shippingAddress.city}, {order.shippingAddress.country}
          </Text>
        </View>

        {/* Billing Block */}
        <View style={styles.infoCard}>
          <Text style={styles.cardHeading}>Billing</Text>
          <Text style={styles.personName}>{order.shippingAddress.fullName}</Text>
          <Text style={styles.contactDetails}>
            {order.shippingAddress.email}
          </Text>
          <Text style={styles.contactDetails}>
            {order.shippingAddress.countryCode} {order.shippingAddress.phone}
          </Text>
          <Text style={styles.addressDetails}>
            {order.shippingAddress.street1}
          </Text>
          <Text style={styles.addressDetails}>
            {order.shippingAddress.city}, {order.shippingAddress.country}
          </Text>
          <Text style={[styles.contactDetails, { marginTop: 4, fontWeight: '600' }]}>
            Payment: {order.paymentDetails.cardType.toUpperCase()} (ending in {order.paymentDetails.cardNumber.slice(-4)})
          </Text>
        </View>

        {/* Order Items */}
        <View style={styles.infoCard}>
          <Text style={styles.cardHeading}>Order Items</Text>
          <DeliveryBanner />

          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={{ uri: item.product.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.product.title}</Text>
                <Text style={styles.itemDetail}>Color: {item.selectedColor}</Text>
                <Text style={styles.itemDetail}>Size: {item.selectedSize}</Text>
                <Text style={styles.itemDetail}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.infoCard}>
          <Text style={styles.cardHeading}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${order.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {order.shippingCost === 0 ? '$0.00' : `$${order.shippingCost.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowTotal]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Back to Shopping Button */}
        <TouchableOpacity style={styles.backToShoppingBtn} onPress={handleBackToShopping}>
          <Text style={styles.backToShoppingText}>Back to Shopping</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.headerTitle,
  },
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  successBlock: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkmarkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  orderNumberText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  orderNumberHighlight: {
    fontWeight: '700',
    color: colors.text,
  },
  emailNotificationText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  timePlacedText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  personName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  contactDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addressDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.xs,
    backgroundColor: '#F3F4F6',
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  itemDetail: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  summaryRowTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  backToShoppingBtn: {
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    backgroundColor: '#FFF',
  },
  backToShoppingText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
});
