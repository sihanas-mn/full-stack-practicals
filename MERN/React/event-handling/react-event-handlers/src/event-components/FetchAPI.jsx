import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  // 1. GET Request: Fetching Data
  const fetchTasks = async () => {
    setLoading(true);
    setError(null); // Reset error state before trying

    try {
      const response = await fetch(`${API_URL}?_limit=5`);

      // Crucial: fetch doesn't throw errors for 404/500 status codes automatically
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching data.");
    } finally {
      setLoading(false); // Turns off loading spinner whether we succeed or fail
    }
  };

  // Run the GET request once when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. POST Request: Submitting Data
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskTitle,
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task. Status: ${response.status}`);
      }

      const createdTask = await response.json();

      // Optimistically update the UI by appending the new task
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
      setNewTaskTitle(""); // Clear the input field
    } catch (err) {
      setError(err.message || "Failed to add new task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Task Manager</h2>

      {/* Form for POST request */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Conditional UI States */}
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;