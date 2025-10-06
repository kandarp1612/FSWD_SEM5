import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const markAsDone = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTask(spokenText);
    };

    recognition.onerror = (event) => {
      alert("Error occurred in recognition: " + event.error);
    };
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>

      <div className="input-section">
        <input
          type="text"
          value={task}
          placeholder="Enter a task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
        <button className="mic" onClick={handleVoiceInput}>Speak</button>
        {tasks.length > 0 && (
          <button className="delete-all-btn" onClick={deleteAllTasks}>
            Delete All
          </button>
        )}
      </div>

      {tasks.length > 0 && (
        <div className="task-header">
          <span>Task</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
      )}

      {tasks.map((t, index) => (
        <div key={index} className="task-row">
          <span className={t.completed ? "completed" : ""}>{t.text}</span>
          <span className={`status ${t.completed ? "done" : "pending"}`}>
            {t.completed ? "Completed" : "Pending"}
          </span>
          <div className="action-buttons">
            {!t.completed && (
              <button onClick={() => markAsDone(index)}>Mark as Done</button>
            )}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
