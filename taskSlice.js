import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch tasks'
      );
    }
  }
);

export const fetchStats = createAsyncThunk(
  'tasks/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch statistics'
      );
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ title, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title, status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to create task'
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, title, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, {
        title,
        status
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to update task'
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to delete task'
      );
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    stats: {
      total: 0,
      todo: 0,
      inProgress: 0,
      completed: 0
    },
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch stats
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.stats.total += 1;
        state.stats.todo += 1;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          const oldStatus = state.items[index].status;
          const newStatus = action.payload.status;
          
          // Update stats
          if (oldStatus !== newStatus) {
            if (oldStatus === 'Todo') state.stats.todo -= 1;
            if (oldStatus === 'In Progress') state.stats.inProgress -= 1;
            if (oldStatus === 'Completed') state.stats.completed -= 1;
            
            if (newStatus === 'Todo') state.stats.todo += 1;
            if (newStatus === 'In Progress') state.stats.inProgress += 1;
            if (newStatus === 'Completed') state.stats.completed += 1;
          }
          
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        const task = state.items.find((t) => t.id === action.payload);
        if (task) {
          state.stats.total -= 1;
          if (task.status === 'Todo') state.stats.todo -= 1;
          if (task.status === 'In Progress') state.stats.inProgress -= 1;
          if (task.status === 'Completed') state.stats.completed -= 1;
        }
        state.items = state.items.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
