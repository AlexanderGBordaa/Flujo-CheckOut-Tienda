import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing } from '../styles/theme';

interface DeliveryBannerProps {
  text?: string;
}

export const DeliveryBanner: React.FC<DeliveryBannerProps> = ({
  text = 'Arrives by April 3 to April 5th',
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="cube-outline" size={18} color="#854D0E" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: '#854D0E',
  },
});
