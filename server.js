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
  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid()
    };

    fs.readFile('./db/db.json', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const notesArray = JSON.parse(data);
      notesArray.push(newNote);

      fs.writeFile('./db/db.json', JSON.stringify(notesArray, null, 2), (err) =>
        err ? console.error(err) : console.log(`The new note, ${title}, has been added to the JSON file.`));
    });

    const response = {
      status: 'success',
      body: newNote
    };

    res.status(201).json(response);
  } else {
    res.status(500).json('Error in saving note');
  };
});

app.get('/api/notes/:id', (req, res) => {
  for (let i = 0; i < db.length; i++) {
    const currentNote = db[i];
    if (currentNote.id === req.params.id) {
      return res.status(200).json(currentNote)
    }
  }
  return res.status(500).json(`The id, ${req.params.id}, does not exist.`)
});

app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let notesArray = JSON.parse(data);
    notesArray = notesArray.filter(obj => obj.id != req.params.id);

    fs.writeFile('./db/db.json', JSON.stringify(notesArray, null, 2), (err) =>
      err ? console.error(err) : console.log(`The note has been deleted`));
  });
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.listen(PORT, () => console.log(`Static asset routes at Port: ${PORT}`));
