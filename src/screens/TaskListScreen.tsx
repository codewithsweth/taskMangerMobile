import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import React from 'react';

const TASK_LIST = [
  {
    id: 1,
    title: 'Task 1',
    description: 'This is the descriptio content for task 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'This is the descriptio content for task 2',
    completed: true,
  },
];

interface TaskProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskListScreen = ({navigation}: any) => {
  const renderTask = ({item}: ListRenderItemInfo<TaskProps>) => {
    return (
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => navigation.navigate('TaskDetails')}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkedBox]}
        />
        <View style={styles.taskContent}>
          <Text style={[styles.taskTitle, item.completed && styles.taskCompleted]}>
            {item.title}
          </Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList<TaskProps>
        data={TASK_LIST}
        renderItem={renderTask}
        keyExtractor={item => item.id?.toString()}
        contentContainerStyle={styles.listContent}
      />
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
