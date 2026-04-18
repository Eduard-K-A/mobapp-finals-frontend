import React, { useState } from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform,
  ScrollView, Text, TextInput, TouchableOpacity, View,
  StatusBar
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services/authService';
import { COLORS } from '../../constants/colors';
import styles from './styles';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Register'> };

export default function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { login } = useAuth();
  const { showToast } = useToast();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    if (!confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) e.terms = 'Please agree to our terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // Splitting fullName for existing service compatibility
      const names = fullName.trim().split(' ');
      const firstName = names[0];
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '-';
      
      const user = await authService.register(firstName, lastName, email.trim(), password);
      login(user);
      showToast(`Welcome to LuxeStay, ${user.firstName}!`, 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topSection}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={18} color="rgba(255, 255, 255, 0.5)" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.headerLogoRow}>
          <View style={styles.logoBox}>
            <Ionicons name="business" size={18} color={COLORS.white} />
          </View>
          <Text style={styles.logoText}>LuxeStay</Text>
        </View>

        <Text style={styles.welcomeTitle}>Create account</Text>
        <Text style={styles.welcomeSubtitle}>Join thousands of travelers enjoying premium stays</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.formSection}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={[styles.inputContainer, errors.fullName ? styles.inputError : null]}>
                <Ionicons name="person-outline" size={18} color="rgba(10, 30, 61, 0.4)" />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="rgba(10, 30, 61, 0.3)"
                  value={fullName}
                  onChangeText={t => { setFullName(t); setErrors(p => ({ ...p, fullName: undefined })); }}
                />
              </View>
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={[styles.inputContainer, errors.email ? styles.inputError : null]}>
                <Ionicons name="mail-outline" size={18} color="rgba(10, 30, 61, 0.4)" />
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor="rgba(10, 30, 61, 0.3)"
                  value={email}
                  onChangeText={t => { setEmail(t); setErrors(p => ({ ...p, email: undefined })); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.optionalText}>Optional</Text>
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={18} color="rgba(10, 30, 61, 0.4)" />
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor="rgba(10, 30, 61, 0.3)"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputContainer, errors.password ? styles.inputError : null]}>
                <Ionicons name="lock-closed-outline" size={18} color="rgba(10, 30, 61, 0.4)" />
                <TextInput
                  style={styles.input}
                  placeholder="Minimum 6 characters"
                  placeholderTextColor="rgba(10, 30, 61, 0.3)"
                  value={password}
                  onChangeText={t => { setPassword(t); setErrors(p => ({ ...p, password: undefined })); }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={styles.eyeBtn}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="rgba(10, 30, 61, 0.4)" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={[styles.inputContainer, errors.confirmPassword ? styles.inputError : null]}>
                <Ionicons name="lock-closed-outline" size={18} color="rgba(10, 30, 61, 0.4)" />
                <TextInput
                  style={styles.input}
                  placeholder="Repeat your password"
                  placeholderTextColor="rgba(10, 30, 61, 0.3)"
                  value={confirmPassword}
                  onChangeText={t => { setConfirmPassword(t); setErrors(p => ({ ...p, confirmPassword: undefined })); }}
                  secureTextEntry={!showPassword}
                />
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity 
              style={styles.termsRow} 
              onPress={() => { setAgreeTerms(!agreeTerms); setErrors(p => ({ ...p, terms: undefined })); }}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
                {agreeTerms && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
              </View>
              <Text style={styles.termsText}>
                I agree to LuxeStay's <Text style={styles.termsBold}>Terms of Service</Text> and <Text style={styles.termsBold}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

            <TouchableOpacity 
              style={[styles.createButton, loading && { opacity: 0.7 }]} 
              onPress={handleRegister} 
              disabled={loading}
            >
              {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.createButtonText}>Create Account</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signInLinkContainer} 
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.alreadyAccountText}>Already have an account?</Text>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}