const express = require('express');
const cors = require('cors');
const db = require('./db'); // import the database setup

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM Tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Task text is required' });
  }

  const sql = 'INSERT INTO Tasks (text) VALUES (?)';
  db.run(sql, [text], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM Tasks WHERE id = ?', [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(row);
    });
  });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const sql = `UPDATE Tasks
               SET text = COALESCE(?, text),
                   completed = COALESCE(?, completed),
                   updatedAt = CURRENT_TIMESTAMP
               WHERE id = ?`;
  db.run(sql, [text, completed, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM Tasks WHERE id = ?', [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Task not found' });
      res.json(row);
    });
  });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Tasks WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });

    db.run('DELETE FROM Tasks WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Task deleted', task: row });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
