import React from "react";

function Task({ task, toggleTask, deleteTask }) {
  return (
    <li
      style={{
        textDecoration: task.completed ? "line-through" : "none",
        opacity: task.completed ? 0.6 : 1,
        marginBottom: "10px",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id, !task.completed)}
      />
      {task.text}
      <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </li>
  );
}

export default Task;
