const fs = require('fs');
const path = require('path');

class JsonStoreAdapter {

    constructor(name = process.env.DICT_DEF_NAME) {
        this.path = process.env.DICT_DIR;

        if (!this.path) {
            throw `Invalid dictionary store location is specified. Please, correct DICT_DIR variable's value.`;
        }

        if (!name) {
            throw `Invalid dictionary store name. Please, correct DICT_DEF_NAME variable's value.`;
        }

        this.path = path.join(this.path, name);
    }

    async write(words) {
        fs.writeFileSync(this.path, JSON.stringify(words));
    }

    async read() {
        const words = fs.readFileSync(this.path);
        return JSON.parse(words);
    }
}

module.exports = JsonStoreAdapter;