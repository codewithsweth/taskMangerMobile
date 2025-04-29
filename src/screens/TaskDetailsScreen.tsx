import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetailsScreen = ({route, navigation}) => {
  const {task} = route.params;

  const formatDate = dateString => {
    if (!dateString) return 'No date set';

    try {
      if (dateString.includes('/')) return dateString;

      const date = new Date(dateString);
      return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(
        date.getDate(),
      ).padStart(2, '0')}/${date.getFullYear()}`;
    } catch (error) {
      return dateString;
    }
  };

  const toggleTaskCompletion = async () => {
    try {
      const storedTasksJson = await AsyncStorage.getItem('tasks');
      if (!storedTasksJson) return;

      const storedTasks = JSON.parse(storedTasksJson);
      const updatedTasks = storedTasks.map(t =>
        t.id === task.id ? {...t, completed: !task.completed} : t,
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigation.navigate('TaskList');
    } catch (error) {
      Alert.alert('Error', 'Failed to update task status');
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      const storedTasksJson = await AsyncStorage.getItem('tasks');
      if (!storedTasksJson) return;

      const storedTasks = JSON.parse(storedTasksJson);
      const updatedTasks = storedTasks.filter(t => t.id !== task.id);

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      Alert.alert('Success', 'Task deleted successfully');
      navigation.navigate('TaskList');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task');
      console.error(error);
    }
  };

  const confirmDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', onPress: deleteTask, style: 'destructive'},
    ]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return '#2ecc71';
      case 'medium':
        return '#f39c12';
      case 'high':
        return '#e74c3c';

      default:
        return '#f39c12';
    }
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View
            style={[
              styles.priorityBadge,
              {backgroundColor: getPriorityColor(task.priority)},
            ]}>
            <Text style={styles.priorityText}>
              {getPriorityLabel(task.priority)}
            </Text>
          </View>
        </View>
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
        {/* Task Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text
              style={[
                styles.infoValue,
                {color: task.completed ? '#2ecc71' : '#e74c3c'},
              ]}>
              {task.completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Due Date</Text>
            <Text style={styles.infoValue}>{task.dueDate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Created</Text>
            <Text style={styles.infoValue}>{formatDate(task.createAt)}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {backgroundColor: task.completed ? '#f39c12' : '#2ecc71'},
          ]}
          onPress={toggleTaskCompletion}>
          <Text style={styles.actionButtonText}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={confirmDelete}>
          <Text style={styles.actionButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  priorityBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginLeft: 8,
  },
  priorityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  label: {
    color: '#2C3E50',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: '#34495E',
    fontSize: 16,
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: 500,
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 500,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
});

export default TaskDetailsScreen;
