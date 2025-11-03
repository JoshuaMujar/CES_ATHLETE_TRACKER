import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const Stats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Plans');

  const trainingPlans = [
    {
      id: 1,
      title: 'Distance Endurance',
      description: 'Build aerobic capacity for 1500m and 5000m events',
      duration: '75 mins',
      exerciseCount: 5,
      category: 'Sprints',
      icon: 'flag',
      color: '#FFC0CB',
      exercises: [
        { name: 'Easy Warm-up Jog', details: '10mins 1.5km' },
        { name: 'Tempo Run', details: '30 mins 5km' },
        { name: 'Hill Repeats', details: '200m' },
      ],
      additionalCount: 2
    },
    {
      id: 2,
      title: 'Long Jump Technique',
      description: 'Technical drills and power development for long jumps',
      duration: '45 mins',
      exerciseCount: 6,
      category: 'Jumps',
      icon: 'trending-up',
      color: '#DDA0DD',
      exercises: [
        { name: 'Warm-up and Mobility', details: '15 mins' },
        { name: 'Approach Run Drills', details: '6 x 30' },
        { name: 'Board Walks', details: '' },
      ],
      additionalCount: 3
    }
  ];

  const filters = [
    { name: 'All Plans', icon: 'apps' },
    { name: 'Sprinting', icon: 'flash' },
    { name: 'Jumping', icon: 'arrow-up' },
    { name: 'Throwing', icon: 'baseball' }
  ];

  const categoryColors = {
    'Sprints': '#FFC0CB',
    'Jumps': '#DDA0DD',
    'Throws': '#F4D03F'
  };

  const filteredPlans = trainingPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All Plans' || plan.category === selectedFilter.replace('ing', 's');
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Training Plans</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search training plan"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.name}
              onPress={() => setSelectedFilter(filter.name)}
              style={[
                styles.filterButton,
                selectedFilter === filter.name ? styles.filterButtonActive : styles.filterButtonInactive
              ]}
            >
              <Ionicons 
                name={filter.icon} 
                size={16} 
                color={selectedFilter === filter.name ? '#fff' : '#333'} 
              />
              <Text style={[
                styles.filterText,
                selectedFilter === filter.name ? styles.filterTextActive : styles.filterTextInactive
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Category Cards */}
        <View style={styles.categoryGrid}>
          <View style={[styles.categoryCard, { backgroundColor: '#FFC0CB' }]}>
            <Ionicons name="flash" size={20} color="#000" />
            <Text style={styles.categoryText}>Sprints</Text>
          </View>
          <View style={[styles.categoryCard, { backgroundColor: '#DDA0DD' }]}>
            <Ionicons name="arrow-up" size={20} color="#000" />
            <Text style={styles.categoryText}>Jumps</Text>
          </View>
          <View style={[styles.categoryCard, { backgroundColor: '#F4D03F' }]}>
            <Ionicons name="baseball" size={20} color="#000" />
            <Text style={styles.categoryText}>Throws</Text>
          </View>
        </View>

        {/* Training Plan Cards */}
        {filteredPlans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            {/* Card Header */}
            <View style={styles.planHeader}>
              <View style={styles.planTitleRow}>
                <View style={[styles.iconContainer, { backgroundColor: plan.color }]}>
                  <Ionicons name={plan.icon} size={20} color="#000" />
                </View>
                <View style={styles.planTitleContainer}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                </View>
              </View>

              {/* Meta Info */}
              <View style={styles.metaContainer}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.metaText}>{plan.duration}</Text>
                </View>
                <Text style={styles.metaText}>{plan.exerciseCount} Exercises</Text>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="create-outline" size={16} color="#2196F3" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="trash-outline" size={16} color="#F44336" />
                  <Text style={[styles.actionText, { color: '#F44336' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Exercises List */}
            <View style={styles.exercisesList}>
              {plan.exercises.map((exercise, id) => (
                <View key={id} style={styles.exerciseRow}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseDetails}>{exercise.details}</Text>
                </View>
              ))}
              {plan.additionalCount > 0 && (
                <Text style={styles.moreExercises}>
                  + {plan.additionalCount} more exercises
                </Text>
              )}
            </View>
          </View>
        ))}

        {filteredPlans.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No training plans found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Stats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#000',
  },
  filterButtonInactive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  filterTextInactive: {
    color: '#333',
  },
  categoryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  categoryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  planHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  planTitleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitleContainer: {
    flex: 1,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  actionText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  exercisesList: {
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  exerciseName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#999',
  },
  moreExercises: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
})