import { useState } from "react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Lainnya");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text, priority, date, category);
    setText("");
    setPriority("medium");
    setDate("");
    setCategory("Lainnya");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tambah tugas baru..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <div className="form-row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">Tinggi</option>
          <option value="medium">Sedang</option>
          <option value="low">Rendah</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Health">Health</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button type="submit">Tambah</button>
    </form>
  );
}

export default TodoForm;
