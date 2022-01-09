const express = require('express');
const path = require('path');

const router = require('./src/routes');
const PORT = process.env.PORT || 3000;

const app = express();
express.static(path.join(__dirname, '/src', '/static'));

app.use(router);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/src', '/static', 'index.html')));

app.get('*', (req, res) => res.redirect('/'));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));