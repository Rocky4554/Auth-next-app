'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { taskAPI } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to load tasks. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchTasks();
  }, [router, fetchTasks]);

  useEffect(() => {
    let filtered = [...tasks];

    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      setShowForm(false);
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskAPI.updateTask(editingTask._id, taskData);
      setShowForm(false);
      setEditingTask(null);
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      search: '',
    });
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-sky-200">Dashboard</h1>
          <p className="text-gray-200 mt-1">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={handleNewTask}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
        >
          + New Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search tasks..."
              className="w-full px-3 py-2 border text-neutral-800 border-gray-400 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
      
              className="w-full px-3 py-2 border text-neutral-800 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border text-neutral-800 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Total Tasks
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {taskStats.total}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Pending
          </h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {taskStats.pending}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            In Progress
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {taskStats.inProgress}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Completed
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {taskStats.completed}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600 mt-4">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            {tasks.length === 0
              ? 'No tasks yet. Create your first task to get started!'
              : 'No tasks match your filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}