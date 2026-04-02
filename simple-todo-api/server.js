require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World');
});

let books = [
  { id: 1, title: "The Great Gatsby" },
  { id: 2, title: "1984" }
];
let nextId = 3;

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title } = req.body;
  const newBook = { id: nextId++, title };
  books.push(newBook);
  res.status(201).json(books);
});

app.patch('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const book = books.find((b) => b.id === parseInt(id));
  if (book) {
    book.title = title;
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter((b) => b.id !== parseInt(id));
  res.json(books);
});

app.get('/books/view', (req, res) => {
  res.render('books', { books });
});

app.get('/secrets', (req, res) => {
  res.send(process.env.SPOTIFY_KEY);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});