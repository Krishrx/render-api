const books = require('./books.json');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const router = express.Router();
const fs = require('fs');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const booksData = JSON.parse(fs.readFileSync('books.json'));

router.get('/api/books', async (req, res) => {
    res.json(booksData);
})

router.get('/api/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await booksData.find((b) => b.id === id);
    if (book) {
        res.json(book);
    }
    else {
        res.json({ error: "Couldn't find book." });
    }
})

app.use(router);
app.listen(8080, () => {
    console.log('app started listening on port ' + 8080);
});