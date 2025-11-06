import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../FireBaseConfig";

export default function TrainingPlan() {
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Plan");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);


  const [planName, setPlanName] = useState("");
  const [planCategory, setPlanCategory] = useState("Sprinting");
  const [planDescription, setPlanDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [exercises, setExercises] = useState([]);

  const categories = ["All Plan", "Sprinting", "Jumping", "Throwing"];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "trainingPlans"),
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlans(fetched);
      },
      (error) => {
        console.error("Error fetching training plans:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const openEditModal = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setPlanName(plan.name || "");
      setPlanCategory(plan.category || "Sprinting");
      setPlanDescription(plan.description || "");
      setDuration(plan.duration?.toString() || "");
      setExercises(plan.exercises || []);
    } else {
      resetForm();
    }
    setIsModalVisible(true);
  };

  const resetForm = () => {
    setEditingPlan(null);
    setPlanName("");
    setPlanCategory("Sprinting");
    setPlanDescription("");
    setDuration("");
    setExercises([]);
  };

  const handleSavePlan = async () => {
    if (!planName.trim()) {
      Alert.alert("Error", "Please enter a Training plan name");
      return;
    }

    const planData = {
      name: planName,
      category: planCategory,
      description: planDescription,
      duration: parseInt(duration) || 0,
      exercises: exercises,
      userId: auth.currentUser?.uid || "unknown",
      updatedAt: new Date(),
    };

    try {
      if (editingPlan) {
        await updateDoc(doc(db, "trainingPlans", editingPlan.id), planData);
      } else {
        await addDoc(collection(db, "trainingPlans"), {
          ...planData,
          createdAt: new Date(),
        });
      }
      setIsModalVisible(false);
      resetForm();
    } catch (error) {
      console.error("Error saving training plan:", error);
      Alert.alert("Error", "Failed to save training plan");
    }
  };

  const handleDeletePlan = async (planId) => {
    Alert.alert(
      "Delete Plan",
      "Are you sure you want to delete this training plan?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "trainingPlans", planId));
            } catch (error) {
              console.error("Error deleting plan:", error);
              Alert.alert("Error", "Failed to delete training plan");
            }
          },
        },
      ]
    );
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: "", reps: "", distance: "", duration: "", notes: "" },
    ]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch = plan.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Plan" || plan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Sprinting":
        return " ";
      case "Jumping":
        return " ";
      case "Throwing":
        return " ";
      default:
        return " ";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Sprinting":
        return "#FFB6D9";
      case "Jumping":
        return "#C4B5FD";
      case "Throwing":
        return "#D4C4A8";
      default:
        return "#E5E7EB";
    }
  };

  const renderPlanCard = ({ item }) => (
    <View style={styles.planCard}>
      <View style={styles.planHeader}>
        <View style={[styles.iconContainer, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.iconText}>{getCategoryIcon(item.category)}</Text>
        </View>
        <Text style={styles.planTitle}>{item.name}</Text>
      </View>

      {item.description ? (
        <Text style={styles.planSubtitle}>{item.description}</Text>
      ) : null}

      <View style={styles.planMeta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⏱</Text>
          <Text style={styles.metaText}>{item.duration || 0} mins</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📋</Text>
          <Text style={styles.metaText}>{item.exercises?.length || 0} Exercises</Text>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={() => openEditModal(item)}>
          <Text style={styles.actionIcon}>✏️</Text>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleDeletePlan(item.id)}>
          <Text style={styles.actionIcon}>🗑️</Text>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {item.exercises && item.exercises.length > 0 && (
        <View style={styles.exerciseList}>
          {item.exercises.slice(0, 3).map((exercise, index) => (
            <View key={index} style={styles.exerciseRow}>
              <Text style={styles.exerciseName}>{exercise.name || "Unnamed Exercise"}</Text>
              <Text style={styles.exerciseDetail}>
                {exercise.sets && exercise.reps
                  ? `${exercise.sets} x ${exercise.reps}`
                  : exercise.distance || exercise.duration || ""}
              </Text>
            </View>
          ))}
          {item.exercises.length > 3 && (
            <Text style={styles.moreExercises}>+ {item.exercises.length - 3} more exercises</Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Training Plans</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search training plan"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* FILTERs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextActive,
              ]}
            >
              {category === "Sprinting" ? " " : category === "Jumping" ? " " : category === "Throwing" ? " " : " "}
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Access Cards */}
      {plans.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickAccessRow}>
          {plans.filter(plan => plan.category === "Sprinting").length > 0 && (
            <View style={[styles.quickAccessCard, styles.quickAccessPink]}>
              <Text style={styles.quickAccessIcon}>🏃</Text>
              <Text style={styles.quickAccessText}>Sprints</Text>
              <Text style={styles.quickAccessCount}>{plans.filter(plan => plan.category === "Sprinting").length}</Text>
            </View>
          )}
          {plans.filter(plan => plan.category === "Jumping").length > 0 && (
            <View style={[styles.quickAccessCard, styles.quickAccessPurple]}>
              <Text style={styles.quickAccessIcon}>🦘</Text>
              <Text style={styles.quickAccessText}>Jumps</Text>
              <Text style={styles.quickAccessCount}>{plans.filter(plan => plan.category === "Jumping").length}</Text>
            </View>
          )}
          {plans.filter(plan => plan.category === "Throwing").length > 0 && (
            <View style={[styles.quickAccessCard, styles.quickAccessBeige]}>
              <Text style={styles.quickAccessIcon}>⚾</Text>
              <Text style={styles.quickAccessText}>Throws</Text>
              <Text style={styles.quickAccessCount}>{plans.filter(plan => plan.category === "Throwing").length}</Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Plans List */}
      <FlatList
        data={filteredPlans}
        keyExtractor={(item) => item.id}
        renderItem={renderPlanCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery || selectedCategory !== "All Plan"
                ? "No training plans found"
                : "No training plans yet. Create your first plan!"}
            </Text>
          </View>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => openEditModal()}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Edit/Create Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {editingPlan ? "Edit Training Plan" : "Create Training Plan"}
                </Text>
                <TouchableOpacity onPress={() => {
                  setIsModalVisible(false);
                  resetForm();
                }}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalSubtitle}>
                {editingPlan ? "Update" : "Create"} training plan for your athletes
              </Text>

              <Text style={styles.label}>Plan Name</Text>
              <TextInput
                placeholder="eg., Sprint Fundamentals"
                value={planName}
                onChangeText={setPlanName}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryRow}>
                {["Sprinting", "Jumping", "Throwing"].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      planCategory === cat && styles.categoryButtonActive,
                    ]}
                    onPress={() => setPlanCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        planCategory === cat && styles.categoryButtonTextActive,
                      ]}
                    >
                      {cat === "Sprinting" ? " " : cat === "Jumping" ? " " : " "}
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Description</Text>
              <TextInput
                placeholder="Brief description of the training plan..."
                value={planDescription}
                onChangeText={setPlanDescription}
                style={[styles.input, styles.textArea]}
                multiline
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.label}>Duration (Minutes)</Text>
              <TextInput
                placeholder="90"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />

              <View style={styles.exerciseHeader}>
                <Text style={styles.label}>Exercise</Text>
                <TouchableOpacity onPress={addExercise} style={styles.addExerciseButton}>
                  <Text style={styles.addExerciseText}>+ Add Exercise</Text>
                </TouchableOpacity>
              </View>

              {exercises.length === 0 && (
                <Text style={styles.noExercisesText}>
                  No exercises added yet. Click "+ Add Exercise" to add one.
                </Text>
              )}

              {exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseCard}>
                  <View style={styles.exerciseCardHeader}>
                    <TextInput
                      placeholder="Exercise Name"
                      value={exercise.name}
                      onChangeText={(text) => updateExercise(index, "name", text)}
                      style={styles.exerciseNameInput}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity onPress={() => removeExercise(index)}>
                      <Text style={styles.removeExercise}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.exerciseDetailsRow}>
                    <TextInput
                      placeholder="Sets"
                      value={exercise.sets}
                      onChangeText={(text) => updateExercise(index, "sets", text)}
                      keyboardType="numeric"
                      style={styles.smallInput}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TextInput
                      placeholder="Reps"
                      value={exercise.reps}
                      onChangeText={(text) => updateExercise(index, "reps", text)}
                      keyboardType="numeric"
                      style={styles.smallInput}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TextInput
                      placeholder="Distance"
                      value={exercise.distance}
                      onChangeText={(text) => updateExercise(index, "distance", text)}
                      style={styles.smallInput}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  <TextInput
                    placeholder="Duration (Minutes)"
                    value={exercise.duration}
                    onChangeText={(text) => updateExercise(index, "duration", text)}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                  />
                  <TextInput
                    placeholder="Notes (optional)"
                    value={exercise.notes}
                    onChangeText={(text) => updateExercise(index, "notes", text)}
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              ))}

              <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan}>
                <Text style={styles.saveButtonText}>
                  {editingPlan ? "Update Training Plan" : "Create Training Plan"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 20,
    color: "#000000",
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#000000",
  },
filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 5,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  filterText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#FFFFFF",

  },
  quickAccessRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  quickAccessCard: {
    width: 90,
    height: 70,
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    justifyContent: "space-between",
  },
  quickAccessPink: {
    backgroundColor: "#FFB6D9",
  },
  quickAccessPurple: {
    backgroundColor: "#C4B5FD",
  },
  quickAccessBeige: {
    backgroundColor: "#D4C4A8",
  },
  quickAccessIcon: {
    fontSize: 20,
  },
  quickAccessText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#000000",
  },
  quickAccessCount: {
    fontSize: 10,
    color: "#000000",
    opacity: 0.7,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 22,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
    color: "#000000",
  },
  planSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 14,
    lineHeight: 18,
  },
  planMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    paddingBottom: 14,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 14,
    marginRight: 2,
  },
  actionText: {
    fontSize: 12,
    color: "#6B7280",
  },
  deleteText: {
    fontSize: 12,
    color: "#EF4444",
  },
  exerciseList: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 14,
    marginTop: 4,
  },
  exerciseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
  },
  exerciseDetail: {
    fontSize: 13,
    color: "#6B7280",
  },
  moreExercises: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#845EC2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },
  closeButton: {
    fontSize: 28,
    color: "#6B7280",
    fontWeight: "300",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
    color: "#000000",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#000000",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  categoryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryButtonActive: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  categoryButtonText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  addExerciseButton: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  addExerciseText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  noExercisesText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 24,
  },
  exerciseCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  exerciseCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  exerciseNameInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#000000",
  },
  removeExercise: {
    fontSize: 18,
    marginLeft: 10,
  },
  exerciseDetailsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  smallInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#000000",
  },
  saveButton: {
    backgroundColor: "#030200ff",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});