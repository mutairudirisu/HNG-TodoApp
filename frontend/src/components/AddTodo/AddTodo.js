'use client';
import { useState } from 'react';
import styles from './AddTodo.module.css';

export default function AddTodo({ onAdd, categories }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        priority,
        category: category.trim() || null,
        dueDate: dueDate || null,
      });
      setTitle('');
      setCategory('');
      setDueDate('');
      setPriority('medium');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit} id="add-todo-form">
      <div className={styles.formTitle}>
        <span>✨</span> New Task
      </div>

      <div className={styles.mainRow}>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="todo-title-input"
          autoFocus
        />
        <button
          type="submit"
          className={styles.addButton}
          disabled={!title.trim() || isSubmitting}
          id="add-todo-btn"
        >
          <span>+</span> Add Task
        </button>
      </div>

      <div className={styles.optionsRow}>
        <select
          className={styles.selectField}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          id="todo-priority-select"
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>

        <input
          type="text"
          className={styles.categoryInput}
          placeholder="Category (e.g., Work, Personal)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          list="category-suggestions"
          id="todo-category-input"
        />
        <datalist id="category-suggestions">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>

        <input
          type="date"
          className={styles.dateInput}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          id="todo-date-input"
        />
      </div>
    </form>
  );
}
