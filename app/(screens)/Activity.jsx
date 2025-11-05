import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Activity() {
  return (
    <View style={styles.container}>
      <Text>Activity log</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
