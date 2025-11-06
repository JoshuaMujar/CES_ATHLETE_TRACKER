import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import CesLogo from "../../assets/logo/CesLogo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBaseConfig";
import { LinearGradient } from 'expo-linear-gradient';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    //router.replace("AppNavigator");
     if (!email || !password) {
       Alert.alert("Error", "Please enter both email and password.");
       return;
     }

     try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       const user = userCredential.user;

       console.log("User signed in:", user.email);
       Alert.alert("Welcome", `Signed in as ${user.email}`);
      
       router.replace("AppNavigator");
     } catch (error) {
       console.error("Login error:", error);
       Alert.alert("Login Failed", error.message);
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => router.push("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.signInBtn} 
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("SignUp")}>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

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
    fontSize: 28,
    fontWeight: '700',
    color: '#050000',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
  },
  formSection: {
    flex: 2,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#050000',
    marginBottom: 8,
    letterSpacing: 0.3,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  signInBtn: {
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
  signInText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
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