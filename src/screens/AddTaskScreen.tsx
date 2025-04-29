import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const renderPriorityButton = (level: string, label: string) => {
    return (
      <TouchableOpacity
        style={[
          styles.priorityButton,
          priority === level && styles[`${level}PrioritySelected`],
        ]}
        onPress={() => setPriority(level)}>
        <Text
          style={[
            styles.priorityButtonText,
            priority === level && styles.selectedPriorityText,
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
            placeholderTextColor="#95a5a6"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description"
            placeholderTextColor="#95a5a6"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Due Date</Text>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="MM/DD/YYYY (optional)"
            placeholderTextColor="#95a5a6"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {renderPriorityButton('low', 'Low')}
            {renderPriorityButton('medium', 'Medium')}
            {renderPriorityButton('high', 'High')}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
    color: '#2c3e50',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textarea: {
    minHeight: 100,
  },

  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: 'white',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#7f8c8d',
  },
  selectedPriorityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  lowPrioritySelected: {
    backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
  },
  mediumPrioritySelected: {
    backgroundColor: '#f39c12',
    borderColor: '#f39c12',
  },
  highPrioritySelected: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },

  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
