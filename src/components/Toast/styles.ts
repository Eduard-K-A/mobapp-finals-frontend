import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  success: { backgroundColor: COLORS.green },
  error: { backgroundColor: COLORS.red },
  info: { backgroundColor: COLORS.navy },
  icon: { marginRight: 10 },
  text: { color: COLORS.white, fontSize: 14, flex: 1, fontWeight: '500' },
});