const parser = require('./word-list-parser');

(async function () {
    const URL = 'https://dictionary.cambridge.org/us/plus/wordlist/24986999_toefl400_9';
    const words = await parser(URL);
    console.log(words);
})();
