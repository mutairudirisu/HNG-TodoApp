'use client';
import styles from './Sidenav.module.css';

export default function Sidenav({
  isOpen,
  onClose,
  filter,
  onFilterChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  categories,
  todos,
  theme,
  onToggleTheme,
}) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const progress = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Counts by priority
  const highCount = todos.filter((t) => t.priority === 'high' && !t.completed).length;
  const mediumCount = todos.filter((t) => t.priority === 'medium' && !t.completed).length;
  const lowCount = todos.filter((t) => t.priority === 'low' && !t.completed).length;

  // Counts by category
  const getCategoryCount = (cat) => todos.filter((t) => t.category === cat && !t.completed).length;

  const hasActiveFilters = filter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all';

  const resetFilters = () => {
    onFilterChange('all');
    onPriorityChange('all');
    onCategoryChange('all');
  };

  const handleSelectFilter = (newFilter) => {
    onFilterChange(newFilter);
    if (window.innerWidth < 1024) onClose();
  };

  const handleSelectPriority = (priority) => {
    onPriorityChange(priorityFilter === priority ? 'all' : priority);
    if (window.innerWidth < 1024) onClose();
  };

  const handleSelectCategory = (cat) => {
    onCategoryChange(categoryFilter === cat ? 'all' : cat);
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.sidenav} ${isOpen ? styles.sidenavOpen : ''}`}
        id="app-sidenav"
        aria-label="Application navigation"
      >
        {/* Header / Brand */}
        <div className={styles.sidenavHeader}>
          <div className={styles.brand}>
            <div className={styles.logoIcon}>→</div>
            <div className={styles.brandInfo}>
              <span className={styles.logoText}>Onward</span>
              <span className={styles.brandTagline}>Task Manager</span>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation"
            id="close-sidenav-btn"
          >
            ✕
          </button>
        </div>

        {/* Sidenav Body */}
        <div className={styles.sidenavContent}>
          {/* Quick Progress Widget */}
          <div className={styles.progressWidget}>
            <div className={styles.progressWidgetHeader}>
              <span className={styles.progressLabel}>Completion</span>
              <span className={styles.progressPercent}>{progress}%</span>
            </div>
            <div className={styles.miniProgressBar}>
              <div
                className={styles.miniProgressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.progressStats}>
              <span>{completedTodos} done</span>
              <span>{activeTodos} pending</span>
            </div>
          </div>

          {/* Main Navigation Views */}
          <div className={styles.navSection}>
            <div className={styles.sectionHeader}>
              <span>Views</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-400)',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                  }}
                  id="reset-filters-btn"
                >
                  Reset
                </button>
              )}
            </div>

            <button
              className={`${styles.navItem} ${filter === 'all' && priorityFilter === 'all' && categoryFilter === 'all' ? styles.navItemActive : ''}`}
              onClick={() => {
                resetFilters();
                if (window.innerWidth < 1024) onClose();
              }}
              id="sidenav-all-tasks-btn"
            >
              <span className={styles.navItemLabel}>
                <span className={styles.navItemIcon}>📋</span>
                <span>All Tasks</span>
              </span>
              <span className={styles.navItemBadge}>{totalTodos}</span>
            </button>

            <button
              className={`${styles.navItem} ${filter === 'active' ? styles.navItemActive : ''}`}
              onClick={() => handleSelectFilter('active')}
              id="sidenav-active-tasks-btn"
            >
              <span className={styles.navItemLabel}>
                <span className={styles.navItemIcon}>⚡</span>
                <span>In Progress</span>
              </span>
              <span className={styles.navItemBadge}>{activeTodos}</span>
            </button>

            <button
              className={`${styles.navItem} ${filter === 'completed' ? styles.navItemActive : ''}`}
              onClick={() => handleSelectFilter('completed')}
              id="sidenav-completed-tasks-btn"
            >
              <span className={styles.navItemLabel}>
                <span className={styles.navItemIcon}>✅</span>
                <span>Completed</span>
              </span>
              <span className={styles.navItemBadge}>{completedTodos}</span>
            </button>
          </div>

          {/* Priorities Section */}
          <div className={styles.navSection}>
            <div className={styles.sectionHeader}>
              <span>Priorities</span>
            </div>

            <button
              className={`${styles.navItem} ${priorityFilter === 'high' ? styles.navItemActive : ''}`}
              onClick={() => handleSelectPriority('high')}
              id="sidenav-priority-high-btn"
            >
              <span className={styles.navItemLabel}>
                <span className={`${styles.priorityDot} ${styles.priorityHigh}`} />
                <span>High Priority</span>
              </span>
              <span className={styles.navItemBadge}>{highCount}</span>
            </button>

            <button
              className={`${styles.navItem} ${priorityFilter === 'medium' ? styles.navItemActive : ''}`}
              onClick={() => handleSelectPriority('medium')}
              id="sidenav-priority-medium-btn"
            >
              <span className={styles.navItemLabel}>
                <span className={`${styles.priorityDot} ${styles.priorityMedium}`} />
                <span>Medium Priority</span>
              </span>
              <span className={styles.navItemBadge}>{mediumCount}</span>
            </button>

            <button
              className={`${styles.navItem} ${priorityFilter === 'low' ? styles.navItemActive : ''}`}
              onClick={() => handleSelectPriority('low')}
              id="sidenav-priority-low-btn"
            >
              <span className={styles.navItemLabel}>
                <span className={`${styles.priorityDot} ${styles.priorityLow}`} />
                <span>Low Priority</span>
              </span>
              <span className={styles.navItemBadge}>{lowCount}</span>
            </button>
          </div>

          {/* Categories Section */}
          <div className={styles.navSection}>
            <div className={styles.sectionHeader}>
              <span>Categories</span>
            </div>

            <div className={styles.categoryList}>
              {categories.length === 0 ? (
                <div className={styles.emptyCategories}>No categories yet</div>
              ) : (
                categories.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.navItem} ${categoryFilter === cat ? styles.navItemActive : ''}`}
                    onClick={() => handleSelectCategory(cat)}
                    id={`sidenav-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className={styles.navItemLabel}>
                      <span className={styles.categoryTag} />
                      <span>{cat}</span>
                    </span>
                    <span className={styles.navItemBadge}>{getCategoryCount(cat)}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer with Theme Switch */}
        <div className={styles.sidenavFooter}>
          <div className={styles.themeControl}>
            <span className={styles.themeText}>
              {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </span>
            <button
              className={styles.themeToggleBtn}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              id="sidenav-theme-toggle-btn"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
