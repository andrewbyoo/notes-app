const fs = require('fs');
const express = require('express');
const db = require('./db/db');
const path = require('path');
const uuid = require('./helpers/uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
  console.log(req.body)
  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid()
    };

    fs.readFile('./db/db.json', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const notesArray = JSON.parse(data);
      notesArray.push(newNote);
      console.log(notesArray);
    });

  }
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.listen(PORT, () => console.log(`Static asset routes at Port: ${PORT}`));
