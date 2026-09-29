'use client';
import styles from './TodoItem.module.css';

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  isDragging,
  isDragOver,
}) {
  const priorityClass = {
    low: styles.priorityLow,
    medium: styles.priorityMedium,
    high: styles.priorityHigh,
  }[todo.priority] || styles.priorityMedium;

  const priorityBadgeClass = {
    low: styles.badgeLow,
    medium: styles.badgeMedium,
    high: styles.badgeHigh,
  }[todo.priority] || styles.badgeMedium;

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString());

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const today = new Date(new Date().toDateString());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todoDate = new Date(date.toDateString());

    if (todoDate.getTime() === today.getTime()) return 'Today';
    if (todoDate.getTime() === tomorrow.getTime()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const classNames = [
    styles.todoItem,
    priorityClass,
    todo.completed ? styles.completed : '',
    isDragging ? styles.dragging : '',
    isDragOver ? styles.dragOver : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      draggable
      onDragStart={(e) => onDragStart(e, todo)}
      onDragOver={(e) => onDragOver(e, todo)}
      onDragEnd={onDragEnd}
      onDrop={(e) => onDrop(e, todo)}
      id={`todo-item-${todo.id}`}
    >
      <div className={styles.dragHandle} title="Drag to reorder">
        ⠿
      </div>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          id={`todo-checkbox-${todo.id}`}
        />
        <div className={styles.checkboxVisual}>
          {todo.completed && <span className={styles.checkmark}>✓</span>}
        </div>
      </label>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{todo.title}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={`${styles.badge} ${priorityBadgeClass}`}>
            {todo.priority}
          </span>
          {todo.category && (
            <span className={`${styles.badge} ${styles.categoryBadge}`}>
              {todo.category}
            </span>
          )}
          {todo.dueDate && (
            <span className={`${styles.badge} ${isOverdue ? styles.overdue : styles.dueDateBadge}`}>
              📅 {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(todo.id)}
          title="Delete task"
          id={`todo-delete-${todo.id}`}
        >
          🗑
        </button>
      </div>
    </div>
  );
}
