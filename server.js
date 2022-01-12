const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const app = express();
const PORT = process.env.port || 3001;

app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`Static asset routes at http://localhost:${PORT}`))
