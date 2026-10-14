import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, CartItem } from '../types';
import { useCheckout } from '../context/CheckoutContext';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
import { DeliveryBanner } from '../components/DeliveryBanner';
import { QuantityStepper } from '../components/QuantityStepper';
import { OptionSelectModal } from '../components/OptionSelectModal';

type Props = NativeStackScreenProps<RootStackParamList, 'ShoppingCart'>;

interface ModalState {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (val: string) => void;
}

export const ShoppingCartScreen: React.FC<Props> = ({ navigation }) => {
  const {
    cartItems,
    updateItemColor,
    updateItemSize,
    updateItemQuantity,
    removeItem,
    resetCart,
    total,
    itemCount,
  } = useCheckout();

  const [modalConfig, setModalConfig] = useState<ModalState>({
    visible: false,
    title: '',
    options: [],
    selectedValue: '',
    onSelect: () => {},
  });

  const openColorPicker = (item: CartItem) => {
    setModalConfig({
      visible: true,
      title: `Select Color for ${item.product.title}`,
      options: item.product.colors,
      selectedValue: item.selectedColor,
      onSelect: (color: string) => updateItemColor(item.id, color),
    });
  };

  const openSizePicker = (item: CartItem) => {
    setModalConfig({
      visible: true,
      title: `Select Size for ${item.product.title}`,
      options: item.product.sizes,
      selectedValue: item.selectedSize,
      onSelect: (size: string) => updateItemSize(item.id, size),
    });
  };

  const handleRemoveProduct = (item: CartItem) => {
    Alert.alert(
      'Remove Product',
      `Are you sure you want to remove ${item.product.title} from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeItem(item.id),
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={styles.cartCard}>
        <View style={styles.cardMain}>
          {/* Product Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>

          {/* Details */}
          <View style={styles.productInfo}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productTitle} numberOfLines={1}>
                  {item.product.title}
                </Text>
                <Text style={styles.productSubtitle} numberOfLines={1}>
                  {item.product.subtitle}
                </Text>
              </View>

              {/* Price */}
              <View style={styles.priceContainer}>
                {item.product.originalPrice && (
                  <Text style={styles.originalPrice}>
                    ${item.product.originalPrice.toFixed(2)}
                  </Text>
                )}
                <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
              </View>
            </View>

            {/* Selectors Row: Color & Size */}
            <View style={styles.selectorsRow}>
              {/* Color Selector */}
              <TouchableOpacity
                style={styles.selectorBtn}
                onPress={() => openColorPicker(item)}
              >
                <Text style={styles.selectorLabel}>Color:</Text>
                <Text style={styles.selectorValue}>{item.selectedColor}</Text>
                <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
              </TouchableOpacity>

              {/* Size Selector */}
              <TouchableOpacity
                style={styles.selectorBtn}
                onPress={() => openSizePicker(item)}
              >
                <Text style={styles.selectorLabel}>Size:</Text>
                <Text style={styles.selectorValue}>{item.selectedSize}</Text>
                <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Bottom Row: Qty Stepper and Delete button */}
            <View style={styles.actionRow}>
              <View style={styles.qtyWrapper}>
                <Text style={styles.qtyLabel}>Qty:</Text>
                <QuantityStepper
                  quantity={item.quantity}
                  onIncrement={() => updateItemQuantity(item.id, 1)}
                  onDecrement={() => updateItemQuantity(item.id, -1)}
                />
              </View>

              {/* Delete Button (Requirement 2) */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleRemoveProduct(item)}
                accessibilityLabel="Eliminar producto"
              >
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
                <Text style={styles.deleteBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <Text style={styles.headerSubtitle}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={resetCart}
          style={styles.resetBtn}
          accessibilityLabel="Reset cart items"
        >
          <Ionicons name="refresh-outline" size={18} color={colors.primary} />
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Main List */}
      <View style={styles.content}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<DeliveryBanner />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              You have removed all items from your shopping cart.
            </Text>
            <TouchableOpacity style={styles.restoreBtn} onPress={resetCart}>
              <Text style={styles.restoreBtnText}>Restore Demo Products</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom Bar */}
      <View style={styles.footer}>
        <View style={styles.totalBlock}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutBtn, cartItems.length === 0 && styles.checkoutBtnDisabled]}
          disabled={cartItems.length === 0}
          onPress={() => navigation.navigate('SecurePayment')}
        >
          <Text style={styles.checkoutBtnText}>Checkout</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      {/* Option Select Modal */}
      <OptionSelectModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        options={modalConfig.options}
        selectedValue={modalConfig.selectedValue}
        onSelect={modalConfig.onSelect}
        onClose={() => setModalConfig((prev) => ({ ...prev, visible: false }))}
      />
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
  headerLeft: {
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.headerTitle,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primaryLight,
  },
  resetBtnText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  cartCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardMain: {
    flexDirection: 'row',
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: borderRadius.sm,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productTitle: {
    ...typography.productTitle,
  },
  productSubtitle: {
    ...typography.productSubtitle,
    marginTop: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginLeft: spacing.xs,
  },
  originalPrice: {
    ...typography.originalPrice,
  },
  price: {
    ...typography.price,
  },
  selectorsRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  selectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FAFAFA',
    gap: 4,
  },
  selectorLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  selectorValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  qtyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qtyLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius.xs,
    backgroundColor: '#FEE2E2',
    gap: 4,
  },
  deleteBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.danger,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  restoreBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  restoreBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalBlock: {
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  checkoutBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnDisabled: {
    backgroundColor: colors.textMuted,
  },
  checkoutBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
