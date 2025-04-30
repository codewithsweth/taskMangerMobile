import {create} from 'zustand';

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  // Fetch all tasks
  fetchTasks: () => null,

  // Add a new task
  addTask: () => null,

  // Update an existing task
  updateTask: () => null,

  // Update task completion status
  toggleTaskCompletion: () => null,

  // Delete a task
  deleteTask: () => null,
}));

export default useTaskStore;
