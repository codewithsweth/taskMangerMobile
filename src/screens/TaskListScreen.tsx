import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskListScreen = ({navigation}: any) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      Alert.alert('Success', 'Task deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', onPress: () => deleteTask(id), style: 'destructive'},
    ]);
  };

  const toggleTaskCompletion = async (id: number) => {
    try {
      const updatedTasks = tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      );
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
      return () => {};
    }, []),
  );

  const renderTask = ({item}: ListRenderItemInfo<TaskProps>) => {
    return (
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => navigation.navigate('TaskDetails', {task: item})}
        onLongPress={() => confirmDelete(item.id)}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkedBox]}
          onPress={() => toggleTaskCompletion(item.id)}
        />
        <View style={styles.taskContent}>
          <Text
            style={[styles.taskTitle, item.completed && styles.taskCompleted]}>
            {item.title}
          </Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.LoadingText}>Loading Tasks...</Text>
      ) : tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Tasks</Text>
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
});

export default TaskListScreen;
