const express = require('express');
const db = require('./db/db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.listen(PORT, () => console.log(`Static asset routes at Port: ${PORT}`));
