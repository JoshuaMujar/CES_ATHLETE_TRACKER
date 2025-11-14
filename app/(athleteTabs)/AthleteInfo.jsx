import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const AthleteInfo = ({ navigation }) => {
  const athletes = [
    { name: "Christian Bryan Garcia", event: "Long distance races" },
    { name: "Seann Stephen Morales", event: "Short distance sprints" },
    { name: "Joshua Ley Mujar", event: "Javelin Throw" },
    { name: "Jords Denel Verecio", event: "100m Hurdle races" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.TitleAthlete}>Athletes</Text>

        {athletes.map((athlete, index) => (
          <View key={index} style={styles.AthletesBox}>
            <View style={styles.IconBox}>
              <Ionicons name="person" size={22} color="#000000ff" />
            </View>
            <Text style={styles.placeholderText}>{athlete.name}</Text>
            <Text style={styles.AthleteEvent}>{athlete.event}</Text>

            <TouchableOpacity
              style={styles.actionIconEdit}
              onPress={() => console.log(`Edit ${athlete.name}`)}
            >
              <Text>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconDelete}
              onPress={() => console.log(`Delete ${athlete.name}`)}
            >
              <Text>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AthleteInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f4f4",
    paddingHorizontal: 15,
    paddingTop: 35,
  },
  AthletesBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#007635",
    height: 100,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  IconBox: {
    position: "absolute",
    top: 20,
    left: 15,
    borderWidth: 2,
    borderColor: "#007635",
    borderRadius: 15,
    backgroundColor: "#F9FAFB",
    padding: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: "#000000ff",
    fontWeight: "500",
    marginLeft: 65,
    marginTop: 15,
  },
  TitleAthlete: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  AthleteEvent: {
    fontSize: 14,
    color: "#0c0101ff",
    marginLeft: 65,
    marginTop: 5,
    fontWeight: "500",
  },
  actionIconEdit: {
    position: "absolute",
    top: 30,
    right: 90,
  },
  actionIconDelete: {
    position: "absolute",
    top: 30,
    right: 40,
    
  },
});
