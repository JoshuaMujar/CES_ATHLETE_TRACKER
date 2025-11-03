import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import CesLogo from "../assets/logo/CesLogo.png";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f5f5f5']}
        style={styles.gradient}
      >
        {/* Top Section with Logo */}
        <View style={styles.topSection}>
          <Image source={CesLogo} style={styles.logo} contentFit="contain" />
          <Text style={styles.appTitle}>CES Training</Text>
        </View>

        {/* Middle Section with Description */}
        <View style={styles.middleSection}>
          <Text style={styles.tagline}>
            Track & Field Athlete{'\n'}Monitoring System
          </Text>
          <Text style={styles.subtitle}>
            Monitor progress, track performance,{'\n'}achieve your goals
          </Text>
        </View>

        {/* Bottom Section with Buttons */}
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={styles.signInBtn} 
            onPress={() => router.push("SignIn")}
            activeOpacity={0.8}
          > 
            <Text style={styles.signInText}>Sign In</Text> 
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signUpBtn} 
            onPress={() => router.push("SignUp")}
            activeOpacity={0.8}
          > 
            <Text style={styles.signUpText}>Create Account</Text> 
          </TouchableOpacity>
          
          
        </View>
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 30,
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#050000',
    letterSpacing: 1,
  },
  middleSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#050000',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSection: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  signInBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#050000',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
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
  signUpBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#050000',
    marginBottom: 24,
  },
  signUpText: {
    color: '#050000',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
  },
});