import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import useTaskStore from '../store/taskStore';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
}

const TaskListScreen = ({navigation}: any) => {
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    toggleTaskCompletion,
    deleteTask,
  } = useTaskStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
      return () => [];
    }, [fetchTasks]),
  );

  const handleDeleteTask = async (id: string) => {
    deleteTask(id);
  };

  const confirmDelete = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => handleDeleteTask(id),
        style: 'destructive',
      },
    ]);
  };

  const handleToggleCompletion = (id: string) => {
    toggleTaskCompletion(id);
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

  const renderTask = ({item}: ListRenderItemInfo<TaskProps>) => {
    return (
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => navigation.navigate('TaskDetails', {task: item})}
        onLongPress={() => confirmDelete(item.id)}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkedBox]}
          onPress={() => handleToggleCompletion(item.id)}
        />
        <View style={styles.taskContent}>
          <Text
            style={[styles.taskTitle, item.completed && styles.taskCompleted]}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={styles.taskDescription}>{item.description}</Text>
          ) : null}
        </View>
        <View
          style={[
            styles.priorityIndicator,
            {borderRightColor: getPriorityColor(item.priority)},
          ]}
        />
      </TouchableOpacity>
    );
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchTasks}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.LoadingText}>Loading tasks...</Text>
      ) : tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet</Text>
          <Text style={styles.emptySubText}>
            Tap the + button to add a new task
          </Text>
        </View>
      ) : (
        <FlatList<TaskProps>
          data={tasks}
          renderItem={renderTask}
          keyExtractor={item => item.id?.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    alignSelf: 'flex-start',
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
  },
  LoadingText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#7f8c8d',
  },
  priorityIndicator: {
    borderRightWidth: 5,
    opacity: 0.8,
    height: '100%',
    borderRadius: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskListScreen;
