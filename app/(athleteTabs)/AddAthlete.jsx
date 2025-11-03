import React, { useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, PanResponder, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

const AddAthlete = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward drags
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // If dragged down more than 100px, close the modal
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: height,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translateY.setValue(0);
            onClose();
          });
        } else {
          // Otherwise, spring back to original position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const events = [
    '100 meters',
    '200 meters',
    '300 meters',
    '400 meters',
    '800 meters'
  ];

  const toggleEvent = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleSubmit = () => {
    // Validate that at least one event is selected
    if (selectedEvents.length === 0) return;
    
    // Handle form submission here
    console.log({ name, age, gender, selectedEvents });
    
    // Clear form
    setName('');
    setAge('');
    setGender('');
    setSelectedEvents([]);
    
    // Close modal with slide down animation
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandleContainer} {...panResponder.panHandlers}>
            <View style={styles.dragHandle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Add New Athlete</Text>
              <Text style={styles.subtitle}>Enter athlete details and events</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter athlete name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Age Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter athlete age"
                placeholderTextColor="#999"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            {/* Gender Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'Male' && styles.genderButtonSelected
                  ]}
                  onPress={() => setGender('Male')}
                >
                  <Text style={[
                    styles.genderText,
                    gender === 'Male' && styles.genderTextSelected
                  ]}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'Female' && styles.genderButtonSelected
                  ]}
                  onPress={() => setGender('Female')}
                >
                  <Text style={[
                    styles.genderText,
                    gender === 'Female' && styles.genderTextSelected
                  ]}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Events Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Events (select at least one)</Text>
              <Text style={styles.eventsSubtitle}>Track Events</Text>
              
              {events.map((event) => (
                <TouchableOpacity
                  key={event}
                  style={styles.checkboxContainer}
                  onPress={() => toggleEvent(event)}
                >
                  <View style={styles.checkbox}>
                    {selectedEvents.includes(event) && (
                      <Ionicons name="checkmark" size={18} color="#845EC2" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{event}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton,
              selectedEvents.length === 0 && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            disabled={selectedEvents.length === 0}
          >
            <Text style={styles.submitText}>Add Athlete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AddAthlete;

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
    height: height * 0.75,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: -10,
    marginHorizontal: -20,
    marginBottom: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#D0D0D0',
    borderRadius: 3,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  closeIcon: {
    padding: 4,
  },
  closeIcon: {
    padding: 4,
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#000",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  genderButtonSelected: {
    backgroundColor: "#845EC2",
    borderColor: "#845EC2",
  },
  genderText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  genderTextSelected: {
    color: "#fff",
  },
  eventsSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D0D0D0",
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#845EC2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#CCC",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});