import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const API_URL = "http://localhost:5000/api/todos";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: input,
      }),
    });

    const data = await res.json();
    setTodos([data, ...todos]);
    setInput("");
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    const data = await res.json();
    setTodos(todos.map((t) => (t._id === id ? data : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center p-6 items-start pt-20">
    <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-xl p-6 border border-slate-700">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-400 tracking-wide">
        Task Hub
      </h1>

      {/* Input Form */}
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 rounded-lg flex items-center justify-center font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </form>

      {/* Todo List Container */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg border border-slate-700 group hover:border-slate-600 transition-colors"
          >
            <div
              className="flex items-center gap-3 cursor-pointer flex-1"
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.completed ? (
                <svg
                  className="text-emerald-400 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              ) : (
                <svg
                  className="text-slate-400 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
              <span
                className={`text-sm tracking-wide transition-all ${todo.completed ? "line-through text-slate-500" : "text-slate-200"}`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-slate-400 hover:text-rose-400 transition-colors ml-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}

        {/* Empty State Statement */}
        {todos.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">
            All caught up! Rest easy.
          </p>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
