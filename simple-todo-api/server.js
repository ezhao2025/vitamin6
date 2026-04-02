require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.set('view engine', 'ejs');

let todos = [];
let nextId = 1;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: nextId++, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));

  if (todo) {
    todo.task = task;
    res.json(todo);
  } else {
    res.status(404).send('To-Do item not found');
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  res.json(todos);
});

// EJS route
app.get('/todos/view', (req, res) => {
  res.render('todos', { todos });
});

// Secrets route
app.get('/secrets', (req, res) => {
  res.send(process.env.SPOTIFY_KEY);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});