'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './page.module.css';
import Sidenav from '../components/Sidenav/Sidenav';
import Header from '../components/Header/Header';
import AddTodo from '../components/AddTodo/AddTodo';
import TodoItem from '../components/TodoItem/TodoItem';
import FilterBar from '../components/FilterBar/FilterBar';
import EmptyState from '../components/EmptyState/EmptyState';
import { fetchTodos, createTodo, updateTodo, deleteTodo, reorderTodos, fetchCategories } from '../lib/api';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  // Filters
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Drag state
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('onward-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Load todos
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [todosData, categoriesData] = await Promise.all([
        fetchTodos(),
        fetchCategories(),
      ]);
      setTodos(todosData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Could not connect to the server. Make sure the backend is running.');
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('onward-theme', newTheme);
  };

  // CRUD operations
  const handleAdd = async (todoData) => {
    const newTodo = await createTodo(todoData);
    setTodos((prev) => [...prev, newTodo]);
    // Refresh categories
    const cats = await fetchCategories();
    setCategories(cats);
  };

  const handleToggle = async (todo) => {
    const updated = await updateTodo(todo.id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    const cats = await fetchCategories();
    setCategories(cats);
  };

  // Drag and drop
  const handleDragStart = (e, todo) => {
    setDraggedItem(todo);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, todo) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedItem && todo.id !== draggedItem.id) {
      setDragOverItem(todo);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDrop = async (e, targetTodo) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetTodo.id) {
      handleDragEnd();
      return;
    }

    // Reorder locally first for instant feedback
    const newTodos = [...todos];
    const dragIdx = newTodos.findIndex((t) => t.id === draggedItem.id);
    const dropIdx = newTodos.findIndex((t) => t.id === targetTodo.id);

    const [removed] = newTodos.splice(dragIdx, 1);
    newTodos.splice(dropIdx, 0, removed);

    // Update positions
    const items = newTodos.map((t, i) => ({ id: t.id, position: i }));
    setTodos(newTodos.map((t, i) => ({ ...t, position: i })));
    handleDragEnd();

    // Sync with backend
    try {
      await reorderTodos(items);
    } catch (err) {
      console.error('Failed to reorder:', err);
      loadData(); // Reload on error
    }
  };

  // Filtered todos
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Status filter
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;

      // Priority filter
      if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

      // Category filter
      if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          todo.title.toLowerCase().includes(query) ||
          (todo.category && todo.category.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [todos, filter, priorityFilter, categoryFilter, searchQuery]);

  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  // Dynamic View Title
  const currentViewTitle = useMemo(() => {
    if (categoryFilter !== 'all') return `${categoryFilter} Tasks`;
    if (priorityFilter !== 'all') {
      return `${priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)} Priority`;
    }
    if (filter === 'active') return 'In Progress';
    if (filter === 'completed') return 'Completed Tasks';
    return 'All Tasks';
  }, [filter, priorityFilter, categoryFilter]);

  if (loading) {
    return (
      <div className={styles.appWrapper}>
        <div className={styles.mainArea}>
          <div className={styles.contentContainer}>
            <div className={styles.loadingState}>
              <div className={styles.loadingDots}>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
              </div>
              <p style={{ marginTop: '16px' }}>Loading Onward tasks...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.appWrapper}>
        <div className={styles.mainArea}>
          <div className={styles.contentContainer}>
            <div className={styles.errorState}>
              <div className={styles.errorIcon}>⚠️</div>
              <p>{error}</p>
              <button className={styles.retryBtn} onClick={loadData} id="retry-btn">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appWrapper}>
      {/* Sidenav (Desktop persistent & Mobile drawer) */}
      <Sidenav
        isOpen={isSidenavOpen}
        onClose={() => setIsSidenavOpen(false)}
        filter={filter}
        onFilterChange={setFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        todos={todos}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Area */}
      <div className={styles.mainArea}>
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          totalTodos={todos.length}
          completedTodos={completedCount}
          onMenuClick={() => setIsSidenavOpen((prev) => !prev)}
          currentViewTitle={currentViewTitle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className={styles.contentContainer}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroGreetingRow}>
              <h2 className={styles.heroTitle}>{currentViewTitle}</h2>
              {(categoryFilter !== 'all' || priorityFilter !== 'all' || filter !== 'all') && (
                <span className={styles.activeFilterBadge}>
                  Filtered ({filteredTodos.length})
                </span>
              )}
            </div>
            <p className={styles.heroSubtitle}>
              {filteredTodos.length === 0
                ? 'No tasks matching current view'
                : `${filteredTodos.length} task${filteredTodos.length === 1 ? '' : 's'} to focus on`}
            </p>
          </div>

          {/* Overall Progress Bar */}
          {todos.length > 0 && (
            <div className={styles.progressSection}>
              <div className={styles.progressInfoRow}>
                <span className={styles.progressTitle}>Progress</span>
                <span className={styles.progressText}>
                  {completedCount} of {todos.length} completed ({progress}%)
                </span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Add Todo Form */}
          <AddTodo onAdd={handleAdd} categories={categories} />

          {/* Quick Filter Bar (Mobile-friendly chips + search) */}
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
          />

          {/* Tasks List */}
          <div className={styles.todoList} id="todo-list">
            {filteredTodos.length === 0 ? (
              <EmptyState filter={todos.length === 0 ? 'all' : filter} />
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  isDragging={draggedItem?.id === todo.id}
                  isDragOver={dragOverItem?.id === todo.id}
                />
              ))
            )}
          </div>

          <footer className={styles.footer}>
            Built with ❤️ — <span className={styles.footerLink}>Onward</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
