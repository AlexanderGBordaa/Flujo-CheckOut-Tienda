export const colors = {
  primary: '#0D6EFD', // vibrant royal blue from Figma buttons
  primaryHover: '#0B5ED7',
  primaryLight: '#E8F0FE',
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  surface: '#F8F9FA',
  border: '#E8ECEF',
  borderDark: '#D1D5DB',
  text: '#191C1F',
  textSecondary: '#6C7278',
  textMuted: '#9CA3AF',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
  bannerBg: '#FEF9E7',
  bannerBorder: '#FDE68A',
  bannerText: '#78350F',
  cardVisa: '#1A1F71',
  cardMaster: '#EB001B',
  cardAmex: '#007BC1',
};

export const typography = {
  headerTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: colors.text,
  },
  productSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.text,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through' as const,
  },
  body: {
    fontSize: 14,
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};
