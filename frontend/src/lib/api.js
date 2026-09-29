function getEndpoint(path = '') {
  const cleanPath = path ? `api/todos/${path.replace(/^\//, '')}` : 'api/todos';
  if (typeof window === 'undefined') {
    // Server runtime: read bound BACKEND_URL variable injected by Vercel
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    return new URL(cleanPath, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString();
  }
  // Client browser: relative URL routed by Vercel top-level rewrites
  return `/${cleanPath}`;
}

export async function fetchTodos() {
  const res = await fetch(getEndpoint());
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function createTodo(data) {
  const res = await fetch(getEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

export async function updateTodo(id, data) {
  const res = await fetch(getEndpoint(String(id)), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(getEndpoint(String(id)), {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete todo');
}

export async function reorderTodos(items) {
  const res = await fetch(getEndpoint('reorder'), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Failed to reorder todos');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(getEndpoint('categories'));
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
