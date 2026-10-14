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
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { useCheckout } from '../context/CheckoutContext';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AddAddress'>;

export const AddAddressScreen: React.FC<Props> = ({ navigation, route }) => {
  const { saveNewAddress, updateAddress, shippingAddress } = useCheckout();
  const addressToEdit = route.params?.addressToEdit;

  // Form states
  const [fullName, setFullName] = useState(addressToEdit ? addressToEdit.fullName : shippingAddress?.fullName || 'Elena Olson');
  const [countryCode, setCountryCode] = useState(addressToEdit ? addressToEdit.countryCode : shippingAddress?.countryCode || '+49');
  const [phone, setPhone] = useState(addressToEdit ? addressToEdit.phone : shippingAddress?.phone || '179 111 1010');
  const [email, setEmail] = useState(addressToEdit ? addressToEdit.email : shippingAddress?.email || 'elena@kanaelsen.com');
  const [addressTitle, setAddressTitle] = useState(addressToEdit ? addressToEdit.addressTitle : 'Home');
  const [street1, setStreet1] = useState(addressToEdit ? addressToEdit.street1 : shippingAddress?.street1 || 'Liebnitzstraße 16, Wohnheim 8, No: 8X');
  const [street2, setStreet2] = useState(addressToEdit?.street2 || '');
  const [city, setCity] = useState(addressToEdit ? addressToEdit.city : shippingAddress?.city || 'Clausthal-Zellerfeld');
  const [country, setCountry] = useState(addressToEdit ? addressToEdit.country : shippingAddress?.country || 'Germany');
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(addressToEdit ? addressToEdit.isSameAsDelivery : true);
  const [billingType, setBillingType] = useState<'Personal' | 'Commercial'>(
    addressToEdit ? addressToEdit.billingType : 'Personal'
  );

  const handleSave = () => {
    if (!fullName.trim() || !phone.trim() || !email.trim() || !street1.trim() || !city.trim()) {
      Alert.alert('Incomplete Form', 'Please fill in all the required fields (*)');
      return;
    }

    const payload = {
      fullName,
      countryCode,
      phone,
      email,
      addressTitle: addressTitle || 'Custom Address',
      street1,
      street2,
      city,
      country,
      isSameAsDelivery,
      billingType,
    };

    if (addressToEdit) {
      updateAddress({ ...payload, id: addressToEdit.id });
    } else {
      saveNewAddress(payload);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{addressToEdit ? 'Edit Address' : 'Add Address'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.requiredNotice}>* Required fields</Text>

        {/* 1. Recipient Information */}
        <View style={styles.sectionHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <Text style={styles.sectionTitle}>Recipient Information</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Name and Surname*</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g. Elena Olson"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Phone Number*</Text>
          <View style={styles.phoneInputRow}>
            <View style={styles.countryCodeBadge}>
              <Text style={styles.flagEmoji}>🇩🇪</Text>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </View>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="179 111 1010"
            />
          </View>
          <Text style={styles.helperText}>For shipping related questions only.</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>E-mail Address*</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="name@example.com"
          />
          <Text style={styles.helperText}>This address will be used to send your order and bill details.</Text>
        </View>

        {/* 2. Shipping Address */}
        <View style={[styles.sectionHeader, { marginTop: spacing.lg }]}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Address Title (Optional)</Text>
          <TextInput
            style={styles.input}
            value={addressTitle}
            onChangeText={setAddressTitle}
            placeholder="Home / Work / Office"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Address*</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0 }]}
              value={street1}
              onChangeText={setStreet1}
              placeholder="Street, apartment, suite etc."
            />
            <Ionicons name="navigate-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>+ Street Address 2 (Optional)</Text>
          <TextInput
            style={styles.input}
            value={street2}
            onChangeText={setStreet2}
            placeholder="Floor, apartment number etc."
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>City*</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="City"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Country*</Text>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            placeholder="Country"
          />
        </View>

        {/* 3. Billing Information */}
        <View style={[styles.sectionHeader, { marginTop: spacing.lg }]}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.sectionTitle}>Billing Information</Text>
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setIsSameAsDelivery(!isSameAsDelivery)}
        >
          <Ionicons
            name={isSameAsDelivery ? 'checkbox' : 'square-outline'}
            size={22}
            color={colors.primary}
          />
          <Text style={styles.checkboxLabel}>Same as delivery address</Text>
        </TouchableOpacity>

        <Text style={[styles.inputLabel, { marginTop: spacing.md }]}>Billing Type*</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setBillingType('Personal')}
          >
            <Ionicons
              name={billingType === 'Personal' ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={colors.primary}
            />
            <Text style={styles.radioLabel}>Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setBillingType('Commercial')}
          >
            <Ionicons
              name={billingType === 'Commercial' ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={colors.primary}
            />
            <Text style={styles.radioLabel}>Commercial</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
          >
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
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
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    ...typography.headerTitle,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  requiredNotice: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionTitle: {
    ...typography.sectionTitle,
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
    height: 44,
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
  phoneInputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  countryCodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: '#FAFAFA',
    gap: 4,
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  helperText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  checkboxLabel: {
    fontSize: 13,
    color: colors.text,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioLabel: {
    fontSize: 13,
    color: colors.text,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});
