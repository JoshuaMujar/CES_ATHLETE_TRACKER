import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";

import HomePage from "../(screens)/HomePage";
import Calendar from "../(screens)/AthleteCalendar";
import Activity from "../(screens)/Activity";
import TrainingPlan from "../(screens)/TrainingPlan";
import Attendance from "../(screens)/AthleteCalendar";  
import AddAthlete from "../(athleteTabs)/AddAthlete";
import AthleteInfo from "../(athleteTabs)/AthleteInfo";
import Competition from "../(athleteTabs)/Competition";



const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const fabAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const hidden =
      pathname?.includes("attendance") || pathname?.includes("settings");

    Animated.timing(fabAnimation, {
      toValue: hidden ? 100 : 0,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [pathname]);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={26}
                color={focused ? "#845EC2" : "#8E8E93"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={26}
                color={focused ? "#845EC2" : "#8E8E93"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Attendance"
          component={Attendance}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "clipboard" : "clipboard-outline"}
                size={26}
                color="#ffffff"
              />
            ),
          }}
        />

        <Tab.Screen
          name="TrainingPlan"
          component={TrainingPlan}
          options={{
            tabBarLabel: "Training Plan",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={26}
                color={focused ? "#845EC2" : "#8E8E93"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Activity"
          component={Activity}
          options={{
            tabBarLabel: "Activity",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "pulse" : "pulse-outline"}
                size={26}
                color={focused ? "#845EC2" : "#8E8E93"}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <Animated.View
        style={[
          styles.fabContainer,
          {
            transform: [{ translateY: fabAnimation }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.fabButton}
          activeOpacity={0.8}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      
      <AddAthlete visible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    height: 70,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "absolute",
  },
  fabContainer: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
  },
  fabButton: {
    backgroundColor: "#845EC2",
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
