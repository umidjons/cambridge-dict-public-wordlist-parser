require('dotenv').config();
const express = require('express');
const cors = require('cors');
const parser = require('./modules/word-list-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/word-list', async (req, res) => {

    const words = await parser(req.body.url);

    if (process.env.DICT_SAVE) {
        const Adapter = require(`./modules/store-adapters/${process.env.DICT_STORE}`);
        const adapter = new Adapter();
        await adapter.write(words);
    }

    res.json(words);
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});