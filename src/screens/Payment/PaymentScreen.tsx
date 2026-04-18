import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../constants/colors';
import { useBookings } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Payment'>;
  route: RouteProp<RootStackParamList, 'Payment'>;
};

const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { room, checkIn, checkOut, guests, totalPrice, specialRequests } = route.params;
  const { addBooking } = useBookings();
  const { showToast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form states (Mock)
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const validateForm = () => {
    if (cardNumber.length < 16) {
      showToast('Please enter a valid card number', 'error');
      return false;
    }
    if (cardName.trim().length < 3) {
      showToast('Please enter the cardholder name', 'error');
      return false;
    }
    if (expiry.length < 5) {
      showToast('Please enter a valid expiry date (MM/YY)', 'error');
      return false;
    }
    if (cvv.length < 3) {
      showToast('Please enter a valid CVV', 'error');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    // Mock processing time
    setTimeout(() => {
      try {
        const bookingId = `booking_${Date.now()}`;
        addBooking({
          id: bookingId,
          userId: user!.id,
          room: {
            id: room.id,
            title: room.name,
            description: '', 
            type: (room.category as any) || 'Suite',
            pricePerNight: room.price,
            maxPeople: guests, 
            amenities: [],
            photos: [{ url: room.image }],
            isAvailable: true,
            averageRating: 5,
          },
          checkInDate: checkIn,
          checkOutDate: checkOut,
          totalGuests: guests,
          totalPrice,
          status: 'Confirmed',
          bookedAt: new Date().toISOString(),
        });

        showToast('Payment Successful!', 'success');
        navigation.replace('BookingSuccess', { bookingId });
      } catch (error) {
        showToast('Booking failed. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Room</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.stepContainer}>
            <View style={styles.stepCircleActive}>
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            </View>
            <Text style={styles.stepText}>Dates</Text>
          </View>
          <View style={styles.stepLineActive} />
          <View style={styles.stepContainer}>
            <View style={styles.stepCircleActive}>
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            </View>
            <Text style={styles.stepText}>Details</Text>
          </View>
          <View style={styles.stepLineActive} />
          <View style={styles.stepContainer}>
            <View style={styles.stepCircleCurrent}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Confirm</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Room Summary */}
        <View style={styles.summaryCard}>
          <Image source={{ uri: room.image }} style={styles.roomThumb} />
          <View style={styles.roomInfo}>
            <Text style={styles.roomType}>{room.category || 'Suite'}</Text>
            <Text style={styles.roomName}>{room.name}</Text>
            <Text style={styles.roomMeta}>Floor {room.floor} · {room.bedType}</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceText}>${room.price}</Text>
            <Text style={styles.perNight}>/night</Text>
          </View>
        </View>

        {/* Total Card */}
        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${totalPrice.toFixed(0)}</Text>
          </View>
          <Text style={styles.taxNote}>Including taxes & fees</Text>
        </View>

        {/* Payment Form */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Payment Details</Text>
            <Ionicons name="card-outline" size={20} color={COLORS.navy} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CARD NUMBER</Text>
            <MaskedTextInput
              mask="9999 9999 9999 9999"
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="rgba(10, 30, 61, 0.4)"
              keyboardType="numeric"
              maxLength={19}
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CARDHOLDER NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="rgba(10, 30, 61, 0.4)"
              value={cardName}
              onChangeText={setCardName}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>EXPIRY</Text>
              <MaskedTextInput
                mask="99/99"
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="rgba(10, 30, 61, 0.4)"
                keyboardType="numeric"
                maxLength={5}
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="•••"
                placeholderTextColor="rgba(10, 30, 61, 0.4)"
                keyboardType="numeric"
                secureTextEntry
                maxLength={3}
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>

          <View style={styles.secureNote}>
            <Ionicons name="lock-closed" size={14} color={COLORS.gray500} />
            <Text style={styles.secureText}>
              Your payment info is encrypted and secure. This is a demo — no real charges.
            </Text>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.payButton, loading && { opacity: 0.7 }]}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(0)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PaymentScreen;
