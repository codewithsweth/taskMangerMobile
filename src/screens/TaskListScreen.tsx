import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const TaskListScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.listContent}>
        <TouchableOpacity
          style={styles.taskItem}
          onPress={() => navigation.navigate('TaskDetails')}>
          <TouchableOpacity
            style={[styles.checkbox, false && styles.checkedBox]}
          />
          <View style={styles.taskContent}>
            <Text style={[styles.taskTitle, false && styles.taskCompleted]}>
              Statement of Purpose
            </Text>
            <Text style={styles.taskDescription}>
              I’m a B.Tech graduate in Information Technology (first class) with
              1 year and 5 months of experience as a Software Engineer at Cloud
              First Computing. During this time, I worked on two major web
              development projects, which strengthened my skills in frontend
              development skills react, javascript, git, nodejs & redux.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 16,
  },
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3498db',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#3498db',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  taskDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default TaskListScreen;
