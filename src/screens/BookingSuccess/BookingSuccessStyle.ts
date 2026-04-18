import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F3',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 165, 116, 0.13)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  iconCircle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.navy,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A7282',
    textAlign: 'center',
    marginBottom: 4,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.navy,
    textAlign: 'center',
    marginBottom: 32,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6A7282',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.navy,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EDE8',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.navy,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gold,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: COLORS.gold,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#F3F4F6',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtnText: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '600',
  },
});
