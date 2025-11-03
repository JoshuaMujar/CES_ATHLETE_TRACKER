import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StatusModal from "../../Components/athleteComponents/StatusModal";

const Attendance = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Oct. 28");
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const [athletes, setAthletes] = useState([
    { id: 1, name: "Verecio, Jords Denel D.V.", status: "Present" },
    { id: 2, name: "Mujar, Joshua Ley G.", status: "Late" },
    { id: 3, name: "Garcia, Christian Bryan S.", status: "Excused" },
    { id: 4, name: "Morales, Seann Stephen ?", status: "Absent" },
  ]);

  const dates = ["Oct. 24", "Oct. 25", "Oct. 26", "Oct. 27", "Oct. 28"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "#D8F3DC";
      case "Absent":
        return "#FECACA";
      case "Late":
        return "#FEF3C7";
      case "Excused":
        return "#DBEAFE";
      default:
        return "#F3F4F6";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <Text style={styles.title}>Athlete Attendance</Text>

        {/* Date Selector */}
        <View style={styles.dateRow}>
          <Text style={styles.selectDate}>Select Date</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="mm/dd/yyyy"
            value={selectedDate}
            editable={false}
          />
        </View>

        {/* Date Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {dates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.datePill,
                selectedDate === date && styles.activeDatePill,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === date && styles.activeDateText,
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Legend */}
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: "#D8F3DC" }]}>
            <Text style={styles.legendText}># Present</Text>
          </View>
          <View style={[styles.legendBox, { backgroundColor: "#FECACA" }]}>
            <Text style={styles.legendText}># Absent</Text>
          </View>
          <View style={[styles.legendBox, { backgroundColor: "#FEF3C7" }]}>
            <Text style={styles.legendText}># Late</Text>
          </View>
          <View style={[styles.legendBox, { backgroundColor: "#DBEAFE" }]}>
            <Text style={styles.legendText}># Excused</Text>
          </View>
        </View>

        {/* Athletes List */}
        <Text style={styles.sectionTitle}>Athletes</Text>

        {athletes.map((athlete) => (
          <TouchableOpacity
            key={athlete.id}
            style={[
              styles.athleteCard,
              { backgroundColor: getStatusColor(athlete.status) },
            ]}
            onPress={() => {
              setSelectedAthlete(athlete);
              setShowModal(true);
            }}
          >
            <View style={styles.profileCircle}>
              <Text style={styles.profileLetter}>
                {athlete.name.charAt(0)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.athleteName}>{athlete.name}</Text>
            </View>

            <View style={styles.statusTag}>
              <Text style={styles.statusText}>{athlete.status}</Text>
              <Ionicons name="chevron-forward" size={16} color="#555" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🟣 Modal */}
      <StatusModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        athlete={selectedAthlete}
        handleStatusChange={(id, status) => {
          setAthletes((prev) =>
            prev.map((athlete) =>
              athlete.id === id ? { ...athlete, status } : athlete
            )
          );
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  selectDate: {
    fontSize: 14,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 120,
    backgroundColor: "#fff",
  },
  dateScroll: {
    marginBottom: 10,
  },
  datePill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    marginRight: 6,
  },
  activeDatePill: {
    backgroundColor: "#845EC2",
  },
  dateText: {
    color: "#333",
  },
  activeDateText: {
    color: "#fff",
    fontWeight: "600",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  legendBox: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  legendText: {
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  athleteCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileLetter: {
    color: "#333",
    fontWeight: "700",
  },
  athleteName: {
    fontSize: 14,
    color: "#333",
  },
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    marginRight: 4,
  },
});
