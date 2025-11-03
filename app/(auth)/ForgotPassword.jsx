import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import CesLogo from "../../assets/logo/CesLogo.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../FireBaseConfig";
import { LinearGradient } from 'expo-linear-gradient';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Success", 
        "A password reset link has been sent to your email.",
        [
          {
            text: "OK",
            onPress: () => router.back()
          }
        ]
      );
      console.log("Password reset email sent to:", email);
    } catch (error) {
      console.error("Reset password error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#ffffff', '#f5f5f5']} style={styles.gradient}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Image source={CesLogo} style={styles.logo} />
          <Text style={styles.title}>Having trouble logging in?</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a link to{'\n'}get back into your account.
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="email@placeholder.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity 
            style={styles.resetBtn} 
            onPress={handleResetPassword}
            activeOpacity={0.8}
          >
            <Text style={styles.resetText}>Reset Password</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 30,
  },
  headerSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#050000',
    marginBottom: 12,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  formSection: {
    flex: 2,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: '#ffffff',
    color: '#050000',
  },
  resetBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#050000',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resetText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  linkText: {
    fontSize: 14,
    color: '#050000',
    fontWeight: '600',
  },
  bottomSpacer: {
    flex: 1,
  },
});