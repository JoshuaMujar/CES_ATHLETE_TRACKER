import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const StatusModal = ({ visible, onClose, athlete, handleStatusChange }) => {
  const [selected, setSelected] = useState(null);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const options = [
    { label: "Present", icon: "checkmark-outline", color: "#4CAF50" },
    { label: "Absent", icon: "close-outline", color: "#F44336" },
    { label: "Late", icon: "time-outline", color: "#FF9800" },
    { label: "Excused", icon: "calendar-outline", color: "#2196F3" },
  ];

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!athlete) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.title}>Mark Attendance</Text>
          <Text style={styles.subtitle}>{athlete.name} - {new Date().toDateString()}</Text>

          <Text style={styles.sectionLabel}>Status</Text>

          <View style={styles.buttonGrid}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionButton,
                  selected === option.label && { backgroundColor: "#845EC2" },
                ]}
                onPress={() => {
                  setSelected(option.label);
                  handleStatusChange(athlete.id, option.label);
                }}
              >
                <Ionicons
                  name={option.icon}
                  size={18}
                  color={selected === option.label ? "#fff" : option.color}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.optionText,
                    selected === option.label && { color: "#fff" },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    height: height * 0.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    transform: [{ translateY: height }],
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionButton: {
    width: "48%",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#845EC2",
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
