import React from "react";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}