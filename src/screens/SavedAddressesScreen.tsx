import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Address } from '../types';
import { useCheckout } from '../context/CheckoutContext';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedAddresses'>;

export const SavedAddressesScreen: React.FC<Props> = ({ navigation }) => {
  const { savedAddresses, shippingAddress, setShippingAddress } = useCheckout();

  const handleSelect = (item: Address) => {
    setShippingAddress(item);
  };

  const handleEdit = (item: Address) => {
    navigation.navigate('AddAddress', { addressToEdit: item });
  };

  const renderAddressItem = ({ item }: { item: Address }) => {
    const isSelected = item.id === shippingAddress?.id;

    return (
      <TouchableOpacity
        style={[styles.addressCard, isSelected && styles.addressCardSelected]}
        onPress={() => handleSelect(item)}
      >
        <View style={styles.radioWrapper}>
          <Ionicons
            name={isSelected ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={isSelected ? colors.primary : colors.textMuted}
          />
        </View>

        <View style={styles.detailsWrapper}>
          <Text style={styles.titleText}>{item.addressTitle || item.fullName}</Text>
          <Text style={styles.personText}>{item.fullName}</Text>
          <Text style={styles.addressLine}>{item.street1}</Text>
          <Text style={styles.addressLine}>
            {item.city}, {item.country}
          </Text>
        </View>

        <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Addresses</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddAddress')}
          style={styles.newBtn}
        >
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.chooseText}>Choose an Address</Text>

        <FlatList
          data={savedAddresses}
          keyExtractor={(item) => item.id}
          renderItem={renderAddressItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Bottom Action */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
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
  newBtn: {
    padding: 4,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  chooseText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  listContainer: {
    paddingBottom: spacing.xxl,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    backgroundColor: '#FAFAFA',
  },
  addressCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFF',
  },
  radioWrapper: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  detailsWrapper: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  personText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  addressLine: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  editBtn: {
    padding: 6,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveBtn: {
    height: 46,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});
