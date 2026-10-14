import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList, CardType } from '../types';
import { useCheckout } from '../context/CheckoutContext';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
import { CardTypeSelector } from '../components/CardTypeSelector';

type Props = NativeStackScreenProps<RootStackParamList, 'SecurePayment'>;

export const SecurePaymentScreen: React.FC<Props> = ({ navigation }) => {
  const {
    shippingAddress,
    paymentDetails,
    updatePaymentDetails,
    setCardType,
    cartItems,
    subtotal,
    shippingCost,
    total,
    placeOrder,
  } = useCheckout();

  const [orderReviewExpanded, setOrderReviewExpanded] = useState(true);

  // Auto detect card brand on number input
  const handleCardNumberChange = (text: string) => {
    // Remove non-numeric
    const cleaned = text.replace(/\D/g, '');
    let detectedType: CardType = paymentDetails.cardType;

    if (cleaned.startsWith('4')) {
      detectedType = 'visa';
    } else if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
      detectedType = 'mastercard';
    } else if (/^3[47]/.test(cleaned)) {
      detectedType = 'amex';
    }

    // Format with spaces every 4 digits
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;

    updatePaymentDetails({
      cardNumber: formatted,
      cardType: detectedType,
    });
  };

  const getCardIcon = () => {
    switch (paymentDetails.cardType) {
      case 'visa':
        return <MaterialCommunityIcons name="credit-card" size={24} color="#1A1F71" />;
      case 'mastercard':
        return <MaterialCommunityIcons name="credit-card-multiple" size={24} color="#EB001B" />;
      case 'amex':
        return <MaterialCommunityIcons name="credit-card-outline" size={24} color="#007BC1" />;
      default:
        return <MaterialCommunityIcons name="cards-outline" size={24} color="#6B7280" />;
    }
  };

  const handlePayNow = () => {
    if (!shippingAddress) {
      Alert.alert('Missing Address', 'Please add a shipping address before proceeding.');
      return;
    }

    if (!paymentDetails.cardHolder.trim() || !paymentDetails.cardNumber.trim()) {
      Alert.alert('Incomplete Payment', 'Please enter your cardholder name and card number.');
      return;
    }

    if (!paymentDetails.expiryMonth.trim() || !paymentDetails.expiryYear.trim() || !paymentDetails.securityCode.trim()) {
      Alert.alert('Incomplete Payment', 'Please enter the expiry date and security code.');
      return;
    }

    const createdOrder = placeOrder();
    navigation.navigate('OrderConfirmation', { order: createdOrder });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Secure Payment</Text>
        <View style={styles.secureBadge}>
          <Ionicons name="shield-checkmark" size={14} color="#15803D" />
          <Text style={styles.secureText}>SECURE</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Section 1: Shipping */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Shipping</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SavedAddresses')}>
              <Text style={styles.editLink}>Add / Edit</Text>
            </TouchableOpacity>
          </View>

          {shippingAddress ? (
            <View style={styles.addressSummary}>
              <Text style={styles.recipientName}>{shippingAddress.fullName}</Text>
              <Text style={styles.contactInfo}>
                {shippingAddress.email} | {shippingAddress.countryCode} {shippingAddress.phone}
              </Text>
              <Text style={styles.addressStreet}>{shippingAddress.street1}</Text>
              <Text style={styles.addressCity}>
                {shippingAddress.city}, {shippingAddress.country}
              </Text>

              <View style={styles.checkboxRow}>
                <Ionicons name="checkbox" size={18} color={colors.primary} />
                <Text style={styles.checkboxLabel}>Billing and delivery addresses are same.</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.emptyAddBtn}
              onPress={() => navigation.navigate('AddAddress')}
            >
              <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.emptyAddText}>Add Address</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Section 2: Payment */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Payment</Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Payment Method', 'You can select or edit card details below.');
              }}
            >
              <Text style={styles.editLink}>Add / Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Requirement 3: Card Type Selector */}
          <CardTypeSelector
            selectedType={paymentDetails.cardType}
            onSelectType={setCardType}
          />

          {/* Form */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Card Holder's Name</Text>
            <TextInput
              style={styles.input}
              value={paymentDetails.cardHolder}
              onChangeText={(text) => updatePaymentDetails({ cardHolder: text })}
              placeholder="e.g. Elena Olson"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { flex: 1, borderWidth: 0 }]}
                value={paymentDetails.cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
                placeholder="5470 0004 0000 0000"
              />
              <View style={{ marginRight: 10 }}>{getCardIcon()}</View>
            </View>
          </View>

          {/* Expiry and CVV Row */}
          <View style={styles.rowTwoCols}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <View style={styles.expiryRow}>
                <TextInput
                  style={[styles.input, styles.expiryInput]}
                  value={paymentDetails.expiryMonth}
                  onChangeText={(text) => updatePaymentDetails({ expiryMonth: text })}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="MM"
                />
                <Text style={styles.expirySlash}>/</Text>
                <TextInput
                  style={[styles.input, styles.expiryInput]}
                  value={paymentDetails.expiryYear}
                  onChangeText={(text) => updatePaymentDetails({ expiryYear: text })}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="YY"
                />
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.inputLabel}>Security Code</Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Security Code (CVV)', '3 or 4 digit code on the back of your card.')
                  }
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={16}
                    color={colors.primary}
                    style={{ marginLeft: 4, marginBottom: 4 }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                value={paymentDetails.securityCode}
                onChangeText={(text) => updatePaymentDetails({ securityCode: text })}
                keyboardType="numeric"
                maxLength={4}
                placeholder="234"
                secureTextEntry
              />
            </View>
          </View>

          {/* Remember card */}
          <TouchableOpacity
            style={[styles.checkboxRow, { marginTop: spacing.md }]}
            onPress={() => updatePaymentDetails({ rememberCard: !paymentDetails.rememberCard })}
          >
            <Ionicons
              name={paymentDetails.rememberCard ? 'checkbox' : 'square-outline'}
              size={20}
              color={colors.primary}
            />
            <Text style={styles.checkboxLabel}>Remember my card for next purchases.</Text>
          </TouchableOpacity>
        </View>

        {/* Section 3: Order Review Accordion */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.orderReviewHeader}
            onPress={() => setOrderReviewExpanded(!orderReviewExpanded)}
          >
            <View>
              <Text style={styles.sectionHeading}>Order Review</Text>
              <Text style={styles.reviewSubtext}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} • Arrives by April 3 to April 5th
              </Text>
            </View>
            <Ionicons
              name={orderReviewExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          {orderReviewExpanded && (
            <View style={styles.orderReviewContent}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.reviewItemRow}>
                  <Image source={{ uri: item.product.image }} style={styles.reviewThumbnail} />
                  <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <Text style={styles.reviewItemTitle}>{item.product.title}</Text>
                    <Text style={styles.reviewItemDetails}>
                      Color: {item.selectedColor} | Size: {item.selectedSize}
                    </Text>
                    <Text style={styles.reviewItemDetails}>Qty: {item.quantity}</Text>
                  </View>
                  <Text style={styles.reviewItemPrice}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}

              <View style={styles.costBreakdown}>
                <View style={styles.costRow}>
                  <Text style={styles.costLabel}>Subtotal</Text>
                  <Text style={styles.costValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.costRow}>
                  <Text style={styles.costLabel}>Shipping</Text>
                  <Text style={styles.costValue}>
                    {shippingCost === 0 ? '$0.00' : `$${shippingCost.toFixed(2)}`}
                  </Text>
                </View>
                <View style={[styles.costRow, styles.costRowTotal]}>
                  <Text style={styles.costTotalLabel}>Total</Text>
                  <Text style={styles.costTotalValue}>${total.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <Text style={styles.disclaimerText}>
            *This is the final step, after you click Pay Now button, the payment will be transacted.
          </Text>
        </View>

        <View style={styles.footerBottom}>
          <View>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalAmount}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={[styles.payNowBtn, cartItems.length === 0 && styles.payNowBtnDisabled]}
            disabled={cartItems.length === 0}
            onPress={handlePayNow}
          >
            <Text style={styles.payNowBtnText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    ...typography.headerTitle,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  secureText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl * 3,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  editLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  addressSummary: {
    paddingTop: 4,
  },
  recipientName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  contactInfo: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 2,
  },
  addressStreet: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  addressCity: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: 6,
  },
  checkboxLabel: {
    fontSize: 12,
    color: colors.text,
  },
  emptyAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: 6,
  },
  emptyAddText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.text,
    backgroundColor: '#FFF',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    backgroundColor: '#FFF',
  },
  rowTwoCols: {
    flexDirection: 'row',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryInput: {
    flex: 1,
    textAlign: 'center',
  },
  expirySlash: {
    marginHorizontal: 6,
    fontSize: 16,
    color: colors.textSecondary,
  },
  orderReviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewSubtext: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  orderReviewContent: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  reviewItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewThumbnail: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.xs,
    backgroundColor: '#F3F4F6',
  },
  reviewItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  reviewItemDetails: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  reviewItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  costBreakdown: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  costRowTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
    marginTop: 4,
  },
  costLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  costValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  costTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  costTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  footerTop: {
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 13,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerTotalLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  footerTotalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  payNowBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: borderRadius.md,
  },
  payNowBtnDisabled: {
    backgroundColor: colors.textMuted,
  },
  payNowBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
