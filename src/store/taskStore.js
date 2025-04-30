import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  // Fetch all tasks
  fetchTasks: async () => {
    set({isLoading: true, error: null});

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

      set({tasks: parsedTasks, isLoading: false});
    } catch (error) {
      console.error('Error fetching tasks: ', error);
      set({error: 'Failed to load tasks', isLoading: false});
    }
  },

  // Add a new task
  addTask: () => null,

  // Update an existing task
  updateTask: () => null,

  // Update task completion status
  toggleTaskCompletion: async id => {
    set({error: null});
    try {
      const updatedTasks = get().tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      );

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      set({tasks: updatedTasks, isLoading: false});
      return {success: true};
    } catch (error) {
      console.error('Error toggling task completion: ', error);
      set({error: 'Failed to update task', isLoading: false});
      return {error: 'Failed to update task'};
    }
  },

  // Delete a task
  deleteTask: async id => {
    try {
      const filteredTasks = get().tasks.filter(task => task.id !== id);
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));

      set({tasks: filteredTasks});
      return {success: true};
    } catch (error) {
      console.error('Error deleting task: ', error);
      set({error: 'Failed to delete task'});
      return {success: false, error: 'Failed to delete task'};
    }
  },
}));

export default useTaskStore;
