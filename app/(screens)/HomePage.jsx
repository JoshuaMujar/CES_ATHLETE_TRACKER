import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AthleteInfo from "../(athleteTabs)/AthleteInfo";
import Competition from "../(athleteTabs)/Competition";


const Dashboard = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, </Text>
            <Text style={styles.subtext}>Welcome to ATHLETICES</Text>
          </View>
          <Ionicons name="notifications-outline" size={22} color="#000000ff" />
        </View>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={() => router.push("/(athleteTabs)/AthleteInfo")}> 
            <Ionicons name="people-outline" size={28} color="#333" />
            <Text style={styles.count}>99</Text>
            <Text style={styles.cardLabel}>Athletes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="trophy-outline" size={28} color="#333" />
            <Text style={styles.count}>3</Text>
            <Text style={styles.cardLabel}>Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardCompetition} onPress={() => router.push("/Competition")}>
            <Ionicons name="calendar-outline" size={28} color="#333" />
            <Text style={styles.count}>20</Text>
            <Text style={styles.Competition}>Days till Competition</Text>
          </TouchableOpacity>
        </View>

        {/* Top Performers */}
        <Text style={styles.sectionTitle}>Top Performers</Text>
        <View style={styles.performersBox}>
          <Text style={styles.placeholderText}>(Christian Bryan Garcia)</Text>
        </View>
        <View style={styles.performersBox}>
          <Text style={styles.placeholderText}>(Seann Stephen Morales)</Text>
        </View>
          <View style={styles.performersBox}>
          <Text style={styles.placeholderText}>(Joshua Ley Mujar)</Text>
        </View>
          <View style={styles.performersBox}>
          <Text style={styles.placeholderText}>(Jords Denel Verecio)</Text>
        </View>
      </ScrollView>

     
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f4f4",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  subtext: {
    color: "#666",
    fontSize: 14,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    width: "47%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "flex-start",
  },
  cardCompetition: {
    backgroundColor: "#ffffffff",
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6, 
    elevation: 2,
    alignItems: "flex-start",
  },

  count: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 6,
    color: "#333",
  },
  cardLabel: {
    fontSize: 14,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
  },
  performersBox: {
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 14,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    padding: 25 ,

  },
  placeholderText: {
    color: "#aaa",
    fontSize: 13,
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  fabButton: {
    backgroundColor: "#845ec2",
    width: 60,  
},
});
