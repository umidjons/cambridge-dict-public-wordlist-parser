const express = require('express');
const parser = require('./word-list-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post('/word-list', async (req, res) => {
    const words = await parser(req.body.url);
    res.json(words);
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});