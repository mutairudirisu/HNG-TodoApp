# Onward — Task Management Application

A full-stack, modern Todo List application built with **NestJS**, **Next.js (App Router)**, **SQLite**, and **Vanilla CSS**.

---

## 🌟 Key Features

- **Create, Read, Update, Delete (CRUD)**: Add tasks with rich metadata, toggle completion, and delete.
- **Drag & Drop Reordering**: Grab any task by the handle (`⠿`) and drag it to reorder. Positions persist in the SQLite database.
- **Priorities**: Assign **High (🔴)**, **Medium (🟡)**, or **Low (🟢)** priority to tasks.
- **Due Dates & Badges**: Set target deadlines; overdue tasks are highlighted automatically.
- **Categories & Tags**: Organize tasks into categories (e.g. Work, Personal) with autocomplete suggestions.
- **Search & Filtering**: Filter by status (*All*, *Active*, *Completed*), priority (*All*, *High*, *Medium*, *Low*), or category, with live search.
- **Dark & Light Themes**: Sleek purple/indigo gradient aesthetic with one-click theme toggle, persisted in local storage.
- **Progress Tracking**: Real-time progress bar with animated completion metrics.

---

## 🏗️ Architecture & Tech Stack

```
Todo-Application/
├── backend/                  # NestJS + TypeORM + SQLite API (Port 3001)
│   ├── src/
│   │   ├── todo/             # Todo Module (Entity, DTO, Service, Controller)
│   │   ├── app.module.ts     # SQLite connection setup
│   │   └── main.ts           # CORS & Global Validation pipes
│   └── onward.db             # SQLite database file
│
└── frontend/                 # Next.js 16 (App Router) (Port 3000)
    └── src/
        ├── app/
        │   ├── globals.css   # Modern CSS variable design system & animations
        │   ├── layout.js     # Root layout with fonts & theme support
        │   ├── page.js       # Main application client page
        │   └── page.module.css
        ├── components/       # Header, AddTodo, TodoItem, FilterBar, EmptyState
        └── lib/api.js        # Backend API client
```

---

## 🚀 How to Run the Application

Both servers are currently active! You can view the application right now in your browser at:

👉 **[http://localhost:3000](http://localhost:3000)**

### Running Manually

If you ever need to stop and restart the servers later:

#### 1. Start the Backend (NestJS)
```bash
cd backend
npm run start:dev
```
*Backend runs on `http://localhost:3001` with SQLite database (`onward.db`).*

#### 2. Start the Frontend (Next.js)
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos` | Fetch all tasks ordered by position |
| `POST` | `/api/todos` | Create a new task |
| `PUT` | `/api/todos/:id` | Update task details or toggle completion |
| `PUT` | `/api/todos/reorder` | Update task ordering positions |
| `DELETE` | `/api/todos/:id` | Delete a task |
| `GET` | `/api/todos/categories`| Get list of unique categories |
