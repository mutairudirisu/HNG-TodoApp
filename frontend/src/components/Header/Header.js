'use client';
import styles from './Header.module.css';

export default function Header({
  theme,
  onToggleTheme,
  totalTodos,
  completedTodos,
  onMenuClick,
  currentViewTitle = 'All Tasks',
  searchQuery,
  onSearchChange,
}) {
  const progress = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className={styles.header} id="app-header">
      <div className={styles.leftSection}>
        {/* Mobile menu button */}
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          id="mobile-menu-btn"
        >
          ☰
        </button>

        {/* Mobile brand (hidden on desktop where brand is in sidenav) */}
        <div className={styles.mobileBrand}>
          <div className={styles.logoIcon}>→</div>
          <span className={styles.logoText}>Onward</span>
        </div>

        {/* Desktop view title */}
        <div className={styles.viewHeader}>
          <h1 className={styles.viewTitle}>{currentViewTitle}</h1>
          <span className={styles.viewDate}>{today}</span>
        </div>
      </div>

      {/* Desktop Center search bar */}
      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search tasks or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="desktop-search-input"
          />
          {searchQuery && (
            <button
              className={styles.clearSearchBtn}
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span>Done:</span>
            <span className={styles.statValue}>
              {completedTodos}/{totalTodos}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{progress}%</span>
          </div>
        </div>

        <button
          className={styles.themeToggle}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          id="theme-toggle-btn"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
