const express = require('express');
const db = require('./db/db');
const path = require('path');
const app = express();
const PORT = process.env.port || 3001;

app.use(express.static('public'));

// When using * instead of /, it would only give me index.html whenever i try to get the /api/notes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

app.listen(PORT, () => console.log(`Static asset routes at http://localhost:${PORT}`));
