const express = require('express');
const path = require('path');

const app = express(); // Create express app
const HOST = 'localhost'; // 127.0.0.1
const PORT = process.env.PORT || 8080;

app.use('/', express.static(path.join(__dirname, 'public'))); //res.render

// Show routers
const accountRouter = require('./routes/books');
app.use('/books', accountRouter);

app.listen(PORT, HOST, () =>
	console.log(`Server is running on http://${HOST}:${PORT}`)
); // Activate server
