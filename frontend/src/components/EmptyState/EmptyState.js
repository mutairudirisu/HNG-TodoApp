'use client';
import styles from './EmptyState.module.css';

export default function EmptyState({ filter }) {
  const messages = {
    all: { icon: '🚀', title: 'Ready to begin?', text: 'Add your first task and start moving forward!' },
    active: { icon: '🎉', title: 'All caught up!', text: 'No active tasks. Enjoy the moment or add something new.' },
    completed: { icon: '📝', title: 'Nothing completed yet', text: 'Complete a task to see it here. You got this!' },
  };

  const msg = messages[filter] || messages.all;

  return (
    <div className={styles.emptyState} id="empty-state">
      <div className={styles.emptyIcon}>{msg.icon}</div>
      <h3 className={styles.emptyTitle}>{msg.title}</h3>
      <p className={styles.emptyText}>{msg.text}</p>
    </div>
  );
}
