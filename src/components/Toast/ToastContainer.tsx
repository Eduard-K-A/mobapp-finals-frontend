import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '../../context/ToastContext';
import styles from './styles';

const ICONS = { success: 'checkmark-circle', error: 'close-circle', info: 'information-circle' };

export default function ToastContainer() {
  const { toast } = useToast();
  if (!toast) return null;
  return (
    <View style={[styles.container, styles[toast.type]]}>
      <Ionicons name={ICONS[toast.type] as any} size={20} color="white" style={styles.icon} />
      <Text style={styles.text}>{toast.message}</Text>
    </View>
  );
}