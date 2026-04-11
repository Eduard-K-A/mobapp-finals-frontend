import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useBookings } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { RootStackParamList } from '../../types';
import styles from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function MyBookingsScreen() {
  const { bookings } = useBookings();
  const { user } = useAuth();
  const navigation = useNavigation<Nav>();
  const myBookings = bookings.filter(b => b.userId === user?.id);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });

  const nights = (checkIn: string, checkOut: string) =>
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));

  const badgeStyle: Record<string, any> = {
    Confirmed: { bg: styles.confirmed, text: styles.confirmedText },
    Pending: { bg: styles.pending, text: styles.pendingText },
    Cancelled: { bg: styles.cancelled, text: styles.cancelledText },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>{myBookings.length} booking{myBookings.length !== 1 ? 's' : ''}</Text>
      </View>

      {myBookings.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🏨</Text>
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptyText}>Browse our rooms and make your first booking!</Text>
        </View>
      ) : (
        <FlatList
          data={myBookings}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('BookingDetail', { bookingId: item.id })}
              activeOpacity={0.88}
            >
              <Image source={{ uri: item.room.thumbnailPic?.url }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                  <Text style={styles.roomName} numberOfLines={1}>{item.room.title}</Text>
                  <View style={[styles.badge, badgeStyle[item.status]?.bg]}>
                    <Text style={badgeStyle[item.status]?.text}>{item.status}</Text>
                  </View>
                </View>
                <View style={styles.dateRow}>
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateLabel}>CHECK-IN</Text>
                    <Text style={styles.dateValue}>{formatDate(item.checkInDate)}</Text>
                  </View>
                  <Ionicons name="arrow-forward" size={16} color={COLORS.gray300} style={{ marginTop: 14 }} />
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateLabel}>CHECK-OUT</Text>
                    <Text style={styles.dateValue}>{formatDate(item.checkOutDate)}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <Text style={styles.nights}>{nights(item.checkInDate, item.checkOutDate)} night{nights(item.checkInDate, item.checkOutDate) > 1 ? 's' : ''}</Text>
                  <Text style={styles.price}>${item.totalPrice}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}