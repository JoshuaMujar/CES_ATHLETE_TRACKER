// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
// import { router } from "expo-router";
// import CesLogo from "../../assets/logo/CesLogo.png";
// import { auth } from "../../FireBaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { LinearGradient } from 'expo-linear-gradient';

// const SignUp = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const signUp = async () => {
//     if (!firstName || !lastName || !email || !password || !confirmPassword) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       console.log("Registered user:", user.email);
//       Alert.alert("Success", `Account created for ${user.email}`);
//       router.replace("/");
//     } catch (error) {
//       console.log(error);
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={['#ffffff', '#f5f5f5']} style={styles.gradient}>
//         <ScrollView 
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Header Section */}
//           <View style={styles.headerSection}>
//             <Image source={CesLogo} style={styles.logo} />
//             <Text style={styles.title}>Create Account</Text>
//             <Text style={styles.subtitle}>Join CES Training today</Text>
//           </View>

//           {/* Form Section */}
//           <View style={styles.formSection}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>First Name</Text>
//               <TextInput
//                 placeholder="Enter your first name"
//                 style={styles.input}
//                 value={firstName}
//                 onChangeText={setFirstName}
//                 placeholderTextColor="#999"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Last Name</Text>
//               <TextInput
//                 placeholder="Enter your last name"
//                 style={styles.input}
//                 value={lastName}
//                 onChangeText={setLastName}
//                 placeholderTextColor="#999"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 placeholder="Enter your email"
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 placeholderTextColor="#999"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Password</Text>
//               <TextInput
//                 placeholder="Create a password"
//                 secureTextEntry
//                 style={styles.input}
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholderTextColor="#999"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Confirm Password</Text>
//               <TextInput
//                 placeholder="Confirm your password"
//                 secureTextEntry
//                 style={styles.input}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 placeholderTextColor="#999"
//               />
//             </View>

//             <TouchableOpacity 
//               style={styles.signUpBtn} 
//               onPress={signUp}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.signUpText}>Create Account</Text>
//             </TouchableOpacity>

//             <View style={styles.footer}>
//               <Text style={styles.footerText}>Already have an account? </Text>
//               <TouchableOpacity onPress={() => router.back()}>
//                 <Text style={styles.linkText}>Sign In</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </View>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 30,
//     paddingBottom: 30,
//   },
//   headerSection: {
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingBottom: 30,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#050000',
//     marginBottom: 8,
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 15,
//     color: '#666666',
//   },
//   formSection: {
//     flex: 1,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#050000',
//     marginBottom: 8,
//     letterSpacing: 0.3,
//   },
//   input: {
//     borderWidth: 1.5,
//     borderColor: '#e0e0e0',
//     borderRadius: 12,
//     padding: 14,
//     fontSize: 15,
//     backgroundColor: '#ffffff',
//     color: '#050000',
//   },
//   signUpBtn: {
//     width: '100%',
//     paddingVertical: 16,
//     backgroundColor: '#050000',
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   signUpText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   linkText: {
//     fontSize: 14,
//     color: '#050000',
//     fontWeight: '600',
//   },
// });