import React, { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import { COLORS } from '../../constants/colors';
import { RootStackParamList } from '../../types';
import { useRooms } from '../../context/RoomContext';
import { useToast } from '../../context/ToastContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BookingStep1'>;
  route: RouteProp<RootStackParamList, 'BookingStep1'>;
};

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });

const pickerOverlay = { flex: 1, justifyContent: 'flex-end' as const, backgroundColor: 'rgba(0,0,0,0.4)' };
const pickerSheet = { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 32, alignItems: 'center' as const };

export default function BookingStep1Screen({ navigation, route }: Props) {
  const { roomId } = route.params;
  const { rooms } = useRooms();
  const room = rooms.find(r => r.id === roomId);
  const { showToast } = useToast();

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [guests, setGuests] = useState(1);

  if (!room) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nights =
    checkIn && checkOut
      ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  
  const basePrice = nights * room.pricePerNight;
  const tax = basePrice * 0.12;
  const totalPrice = basePrice + tax;

  const handleContinue = () => {
    if (!checkIn || !checkOut) {
      showToast('Please select check-in and check-out dates', 'error');
      return;
    }
    if (nights <= 0) {
      showToast('Check-out must be after check-in', 'error');
      return;
    }

    navigation.navigate('BookingStep2', {
      room: {
        id: room.id,
        name: room.title,
        image: room.thumbnailPic?.url || '',
        price: room.pricePerNight,
        category: room.type,
        floor: 'High',
        bedType: 'Premium',
      },
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests,
      totalPrice,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Dates</Text>
          </View>
          <View style={styles.stepLineInactive} />
          <View style={styles.stepContainer}>
            <View style={styles.stepCircleInactive}>
              <Text style={[styles.stepNumberText, { color: 'rgba(255,255,255,0.5)' }]}>2</Text>
            </View>
            <Text style={[styles.stepText, { color: 'rgba(255,255,255,0.5)' }]}>Details</Text>
          </View>
          <View style={styles.stepLineInactive} />
          <View style={styles.stepContainer}>
            <View style={styles.stepCircleInactive}>
              <Text style={[styles.stepNumberText, { color: 'rgba(255,255,255,0.5)' }]}>3</Text>
            </View>
            <Text style={[styles.stepText, { color: 'rgba(255,255,255,0.5)' }]}>Confirm</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Room Summary Card */}
        <View style={styles.summaryCard}>
          <Image source={{ uri: room.thumbnailPic?.url }} style={styles.roomThumb} />
          <View style={styles.roomInfo}>
            <Text style={styles.roomType}>{room.type}</Text>
            <Text style={styles.roomName}>{room.title}</Text>
            <Text style={styles.roomMeta}>Floor High · Premium</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceText}>${room.pricePerNight}</Text>
            <Text style={styles.perNight}>/night</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>CHECK-IN DATE</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              if (!checkIn) setCheckIn(today);
              setShowCheckIn(true);
            }}
          >
            <Ionicons name="calendar-outline" size={20} color={COLORS.gold} style={styles.inputIcon} />
            <Text style={checkIn ? styles.inputValue : styles.inputPlaceholder}>
              {checkIn ? fmtDate(checkIn) : 'Select date'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>CHECK-OUT DATE</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              if (!checkOut) {
                const base = checkIn || today;
                setCheckOut(new Date(base.getTime() + 86400000));
              }
              setShowCheckOut(true);
            }}
          >
            <Ionicons name="calendar-outline" size={20} color={COLORS.gold} style={styles.inputIcon} />
            <Text style={checkOut ? styles.inputValue : styles.inputPlaceholder}>
              {checkOut ? fmtDate(checkOut) : 'Select date'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Guests Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>NUMBER OF GUESTS</Text>
          <View style={styles.guestSelector}>
            <Ionicons name="people-outline" size={20} color={COLORS.gold} style={styles.inputIcon} />
            <TouchableOpacity
              style={styles.guestBtn}
              onPress={() => setGuests(g => Math.max(1, g - 1))}
            >
              <Text style={styles.guestBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.guestCount}>{guests} {guests === 1 ? 'Guest' : 'Guests'}</Text>
            <TouchableOpacity
              style={[styles.guestBtn, styles.guestBtnPlus]}
              onPress={() => setGuests(g => Math.min(room.maxPeople, g + 1))}
            >
              <Text style={[styles.guestBtnText, { color: COLORS.white }]}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.maxCapacity}>Max capacity: {room.maxPeople} guests</Text>
        </View>

        {/* Price Breakdown */}
        {nights > 0 && (
          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Price Breakdown</Text>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>${room.pricePerNight} × {nights} nights</Text>
              <Text style={styles.breakdownValue}>${basePrice.toFixed(0)}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Taxes & fees (12%)</Text>
              <Text style={styles.breakdownValue}>${tax.toFixed(0)}</Text>
            </View>
            <View style={[styles.breakdownRow, { marginTop: 8 }]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(0)}</Text>
            </View>
          </View>
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers (Reuse existing logic) */}
      {showCheckIn && (
        Platform.OS === 'ios' ? (
          <Modal visible={showCheckIn} transparent animationType="slide">
            <TouchableOpacity style={styles.pickerOverlay} activeOpacity={1} onPress={() => setShowCheckIn(false)}>
              <View style={styles.pickerSheet}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerTitle}>Check-in Date</Text>
                  <TouchableOpacity onPress={() => setShowCheckIn(false)}>
                    <Text style={styles.pickerDone}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={checkIn ?? today}
                  mode="date"
                  display="inline"
                  themeVariant="light"
                  accentColor={COLORS.gold}
                  minimumDate={today}
                  onChange={(_, date) => date && setCheckIn(date)}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        ) : (
          <DateTimePicker
            value={checkIn ?? today}
            mode="date"
            display="default"
            minimumDate={today}
            onChange={(_, date) => { setShowCheckIn(false); if (date) setCheckIn(date); }}
          />
        )
      )}

      {showCheckOut && (
        Platform.OS === 'ios' ? (
          <Modal visible={showCheckOut} transparent animationType="slide">
            <TouchableOpacity style={styles.pickerOverlay} activeOpacity={1} onPress={() => setShowCheckOut(false)}>
              <View style={styles.pickerSheet}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerTitle}>Check-out Date</Text>
                  <TouchableOpacity onPress={() => setShowCheckOut(false)}>
                    <Text style={styles.pickerDone}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={checkOut ?? (checkIn ? new Date(checkIn.getTime() + 86400000) : today)}
                  mode="date"
                  display="inline"
                  themeVariant="light"
                  accentColor={COLORS.gold}
                  minimumDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date(today.getTime() + 86400000)}
                  onChange={(_, date) => date && setCheckOut(date)}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        ) : (
          <DateTimePicker
            value={checkOut ?? (checkIn ? new Date(checkIn.getTime() + 86400000) : today)}
            mode="date"
            display="default"
            minimumDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date(today.getTime() + 86400000)}
            onChange={(_, date) => { setShowCheckOut(false); if (date) setCheckOut(date); }}
          />
        )
      )}
    </View>
  );
}
