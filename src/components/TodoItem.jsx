import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDate, setEditDate] = useState(todo.date || "");
  const [editCategory, setEditCategory] = useState(todo.category || "Lainnya");

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(
        todo.id,
        editText.trim(),
        editPriority,
        editDate || null,
        editCategory,
      );
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setEditPriority(todo.priority);
      setEditDate(todo.date || "");
      setEditCategory(todo.category || "Lainnya");
      setIsEditing(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const priorityLabel = {
    high: "Tinggi",
    medium: "Sedang",
    low: "Rendah",
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <div className="todo-content">
        {isEditing ? (
          <div className="edit-mode">
            <input
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="edit-row">
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>

              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Health">Health</option>
                <option value="Lainnya">Lainnya</option>
              </select>

              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
              <button type="button" onClick={handleEdit}>
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <>
            <span
              className="todo-text"
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
            </span>
            <div className="todo-meta">
              <span className={`priority-badge ${todo.priority}`}>
                {priorityLabel[todo.priority]}
              </span>
              <span className="category-badge">{todo.category}</span>
              {todo.date && (
                <span className="todo-date">📅 {formatDate(todo.date)}</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="actions">
        <button onClick={() => setIsEditing(true)} title="Edit">
          ✎
        </button>
        <button onClick={() => onDelete(todo.id)} title="Hapus">
          ×
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
