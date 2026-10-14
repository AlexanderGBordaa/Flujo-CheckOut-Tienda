import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CardType } from '../types';
import { colors, borderRadius, spacing } from '../styles/theme';

interface CardTypeSelectorProps {
  selectedType: CardType;
  onSelectType: (type: CardType) => void;
}

interface CardOption {
  id: CardType;
  label: string;
  iconName: string;
  accentColor: string;
}

const CARD_OPTIONS: CardOption[] = [
  { id: 'visa', label: 'Visa', iconName: 'credit-card', accentColor: '#1A1F71' },
  { id: 'mastercard', label: 'Mastercard', iconName: 'credit-card-multiple', accentColor: '#EB001B' },
  { id: 'amex', label: 'Amex', iconName: 'credit-card-outline', accentColor: '#007BC1' },
  { id: 'other', label: 'Otras', iconName: 'cards-outline', accentColor: '#6B7280' },
];

export const CardTypeSelector: React.FC<CardTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Tipo de tarjeta</Text>
      <View style={styles.container}>
        {CARD_OPTIONS.map((opt) => {
          const isSelected = opt.id === selectedType;
          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.cardBtn,
                isSelected && styles.cardBtnActive,
                isSelected && { borderColor: opt.accentColor },
              ]}
              onPress={() => onSelectType(opt.id)}
            >
              <MaterialCommunityIcons
                name={opt.iconName as any}
                size={20}
                color={isSelected ? opt.accentColor : colors.textSecondary}
              />
              <Text
                style={[
                  styles.cardBtnLabel,
                  isSelected && styles.cardBtnLabelActive,
                  isSelected && { color: opt.accentColor },
                ]}
              >
                {opt.label}
              </Text>
              {isSelected && (
                <View style={[styles.checkDot, { backgroundColor: opt.accentColor }]}>
                  <Ionicons name="checkmark" size={10} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'space-between',
  },
  cardBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: '#FAFAFA',
    position: 'relative',
    gap: 4,
  },
  cardBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBtnLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  cardBtnLabelActive: {
    fontWeight: '700',
  },
  checkDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
