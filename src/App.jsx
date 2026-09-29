import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("react-todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("react-dark") === "true";
  });

  useEffect(() => {
    localStorage.setItem("react-todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("react-dark", darkMode);
  }, [darkMode]);

  const addTodo = (text, priority, date, category) => {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority: priority || "medium",
      date: date || null,
      category: category || "Lainnya",
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText, newPriority, newDate, newCategory) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
              priority: newPriority,
              date: newDate,
              category: newCategory,
            }
          : todo,
      ),
    );
  };

  // Filter + Search
  const filteredTodos = todos.filter((todo) => {
    // Filter status
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase();
      return (
        todo.text.toLowerCase().includes(keyword) ||
        todo.category.toLowerCase().includes(keyword)
      );
    }
    return true;
  });

  // Sort by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTodos = [...filteredTodos].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="header">
        <h1>React Todo</h1>
        <button className="dark-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <TodoForm onAdd={addTodo} />

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari tugas atau kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Semua
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Aktif
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Selesai
        </button>
      </div>

      <TodoList
        todos={sortedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      <div className="footer">
        <span>{remaining} tugas tersisa</span>
        {todos.some((t) => t.completed) && (
          <button onClick={() => setTodos(todos.filter((t) => !t.completed))}>
            Hapus yang selesai
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
