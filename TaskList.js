import React from "react";
import Task from "./Task";

function TaskList({ tasks, toggleTask, deleteTask }) {
  if (!tasks.length) return <p>No tasks yet!</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
