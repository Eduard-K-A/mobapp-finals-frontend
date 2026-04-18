import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

// HIG Standard Spacing
const SPACING = {
  XS: 8,
  SM: 16,
  MD: 24,
  LG: 32,
  XL: 48,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  carouselContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    // Horizontal padding: 20pt is the iOS standard, 24-28pt for "inset" feel
    paddingHorizontal: Platform.select({ ios: 32, android: 24 }),
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS + 4,
    // Logo should not be too far down, but clear of the notch/Island
    marginTop: Platform.select({ ios: 20, android: 10 }),
  },
  logoContainer: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoTextContainer: {
    justifyContent: 'center',
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: '700', // Semibold/Bold
    color: COLORS.white,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  logoSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.gold,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // Vertical breathing between header and footer
    paddingVertical: SPACING.MD,
  },
  title: {
    fontWeight: '800',
    color: COLORS.white,
    // Semantic scaling: Large Title equivalent
    fontSize: Platform.select({ ios: 34, android: 36 }),
    lineHeight: Platform.select({ ios: 41, android: 44 }),
    marginBottom: SPACING.SM,
    textAlign: 'left',
  },
  subtitle: {
    // Semantic scaling: Body equivalent
    fontSize: Platform.select({ ios: 17, android: 16 }),
    color: 'rgba(255,255,255,0.65)',
    lineHeight: Platform.select({ ios: 24, android: 26 }),
    marginBottom: SPACING.LG,
    textAlign: 'left',
    maxWidth: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    marginBottom: SPACING.LG,
  },
  paginationDotActive: {
    width: 32,
    height: 6,
    backgroundColor: COLORS.gold,
    borderRadius: 99,
  },
  paginationDot: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 99,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.XS + 2,
    alignItems: 'flex-start',
    width: '100%',
  },
  featurePill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 99,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  actionsContainer: {
    gap: SPACING.SM,
    width: '100%',
    // Extra breathing room at bottom for Home Indicator
    paddingBottom: Platform.select({ ios: 10, android: 0 }),
  },
  primaryButton: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 17, // iOS standard for buttons
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    marginTop: SPACING.SM,
    lineHeight: 18,
  },
});