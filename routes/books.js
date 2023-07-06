const express = require('express');
const router = express.Router();

// "Middleware"
router.use(express.json());
router.use(express.urlencoded({ extended: true })); // New one para forms

// "Database"
const books = [
	{ title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
	{ title: 'The Prophet', author: 'Kahlil Gibran', year: 1923 },
	{ title: 'The Giver', author: 'Lois Lowry', year: 1993 },
];

router.get('/', (req, res) => {
	res.status(200).json(books);
});

router.post('/add', (req, res) => {
	let { title, author, year } = req.body;
	year = parseInt(year);
	if (!title || !author || Number.isNaN(year))
		return res.status(400).redirect('/new-book.html');
	books.push({ title, author, year });
	res.status(200).redirect('/');
});

router.param('index', (req, res, next, index) => {
	index = parseInt(index);
	if (Number.isNaN(index) || index >= books.length)
		return res.status(400).json({ message: 'Invalid Index' });
	req.index = index;
	next();
});

router
	.route('/:index')
	.get((req, res) => {
		return res.status(200).json(books[req.index]);
	})
	.put((req, res) => {
		let { title, author, year } = req.body;
		year = parseFloat(year);
		if (title) books[req.index].title = title;
		if (author) books[req.index].author = author;
		if (!Number.isNaN(year)) books[req.index].year = year;
		return res.status(200).json(books[req.index]);
	})
	.delete((req, res) => {
		books.splice(req.index, 1);
		return res.status(200).json(books);
	});

module.exports = router;
