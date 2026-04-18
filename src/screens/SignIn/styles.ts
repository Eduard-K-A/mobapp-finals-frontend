import { StyleSheet, Platform, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F3', // Figma Container Background
  },
  scroll: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: COLORS.navy,
    height: 240,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  logoBox: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.gold,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.navy,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.gold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    gap: 12,
    // Shadow for iOS
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 2,
  },
  inputError: {
    borderColor: COLORS.red,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.navy,
  },
  eyeBtn: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.red,
    marginTop: 4,
  },
  signInButton: {
    backgroundColor: COLORS.gold,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.33,
    shadowRadius: 24,
    elevation: 8,
  },
  signInButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E4DF',
  },
  dividerText: {
    fontSize: 12,
    color: '#99A1AF',
  },
  createAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 30, 61, 0.03)',
    borderWidth: 1.1,
    borderColor: 'rgba(10, 30, 61, 0.07)',
    borderRadius: 16,
    height: 54,
    gap: 6,
  },
  noAccountText: {
    fontSize: 14,
    color: '#6B7280',
  },
  createOneText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.navy,
  },
  footerFeatures: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 'auto',
    paddingVertical: 32,
  },
  featureItem: {
    alignItems: 'center',
    gap: 4,
  },
  featureIcon: {
    fontSize: 18,
  },
  featureLabel: {
    fontSize: 10,
    color: '#99A1AF',
  },
});