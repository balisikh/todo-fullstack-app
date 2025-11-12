import React from 'react';

function Footer({ totalTasks, completedTasks }) {
  return (
    <footer>
      <span>Total Tasks: {totalTasks}</span>
      <span>Completed: {completedTasks}</span>
    </footer>
  );
}

export default Footer;
