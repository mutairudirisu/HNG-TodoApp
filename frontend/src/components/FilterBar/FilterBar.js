'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './FilterBar.module.css';

export default function FilterBar({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  categories,
  categoryFilter,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
}) {
  const chipsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const hasActiveFilters = filter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all';

  const resetAll = () => {
    onFilterChange('all');
    onPriorityChange('all');
    onCategoryChange('all');
  };

  const checkScroll = () => {
    if (chipsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = chipsRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = chipsRef.current;
    if (!el) return;

    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const handleScroll = () => {
    checkScroll();
  };

  const scroll = (direction) => {
    if (chipsRef.current) {
      const offset = direction === 'left' ? -200 : 200;
      chipsRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleWheel = (e) => {
    if (chipsRef.current && e.deltaY !== 0) {
      chipsRef.current.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  return (
    <div className={styles.filterContainer} id="filter-bar">
      {/* Search Input for Mobile/Tablet Screens */}
      <div className={styles.mobileSearchRow}>
        <span className={styles.mobileSearchIcon}>🔍</span>
        <input
          type="text"
          className={styles.mobileSearchInput}
          placeholder="Search your tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          id="mobile-search-input"
        />
      </div>

      {/* Tabs / Filter Chips Wrapper with Scroll Buttons */}
      <div className={styles.chipsWrapper}>
        {canScrollLeft && (
          <button
            type="button"
            className={`${styles.scrollNavBtn} ${styles.scrollLeftBtn}`}
            onClick={() => scroll('left')}
            aria-label="Scroll tabs left"
            title="Scroll left"
          >
            ‹
          </button>
        )}

        {/* Horizontal Scrollable Quick-Filter Chips */}
        <div
          ref={chipsRef}
          className={styles.scrollableChips}
          role="tablist"
          aria-label="Task filters"
          onScroll={handleScroll}
          onWheel={handleWheel}
        >
          {/* Reset filter button if any active */}
          {hasActiveFilters && (
            <button
              className={`${styles.chip} ${styles.clearFiltersChip}`}
              onClick={resetAll}
              title="Reset filters"
              id="clear-filters-chip"
            >
              ✕ Reset
            </button>
          )}

          {/* Status filters */}
          <button
            className={`${styles.chip} ${filter === 'all' ? styles.chipActive : ''}`}
            onClick={() => onFilterChange('all')}
            id="chip-filter-all"
          >
            📋 All
          </button>
          <button
            className={`${styles.chip} ${filter === 'active' ? styles.chipActive : ''}`}
            onClick={() => onFilterChange('active')}
            id="chip-filter-active"
          >
            ⚡ Active
          </button>
          <button
            className={`${styles.chip} ${filter === 'completed' ? styles.chipActive : ''}`}
            onClick={() => onFilterChange('completed')}
            id="chip-filter-completed"
          >
            ✅ Done
          </button>

          <div className={styles.chipDivider} />

          {/* Priority quick filters */}
          <button
            className={`${styles.chip} ${priorityFilter === 'high' ? styles.chipActive : ''}`}
            onClick={() => onPriorityChange(priorityFilter === 'high' ? 'all' : 'high')}
            id="chip-priority-high"
          >
            🔴 High
          </button>
          <button
            className={`${styles.chip} ${priorityFilter === 'medium' ? styles.chipActive : ''}`}
            onClick={() => onPriorityChange(priorityFilter === 'medium' ? 'all' : 'medium')}
            id="chip-priority-medium"
          >
            🟡 Medium
          </button>
          <button
            className={`${styles.chip} ${priorityFilter === 'low' ? styles.chipActive : ''}`}
            onClick={() => onPriorityChange(priorityFilter === 'low' ? 'all' : 'low')}
            id="chip-priority-low"
          >
            🟢 Low
          </button>

          {/* Category chips if any exist */}
          {categories.length > 0 && <div className={styles.chipDivider} />}
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.chip} ${categoryFilter === cat ? styles.chipActive : ''}`}
              onClick={() => onCategoryChange(categoryFilter === cat ? 'all' : cat)}
              id={`chip-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              🏷️ {cat}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className={`${styles.scrollNavBtn} ${styles.scrollRightBtn}`}
            onClick={() => scroll('right')}
            aria-label="Scroll tabs right"
            title="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
