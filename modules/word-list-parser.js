const axios = require('axios');
const cheer = require('cheerio');

/**
 * Downloads a given page
 * @param {string} url URL of the page to download
 * @return {Promise<cheerio>} cheerio object of the page
 */
async function getPage(url) {
    const result = await axios.get(url);
    return cheer.load(result.data);
}

/**
 * Retrieves phrases from the given entries cheerio object
 * @param $ cheerio reference
 * @param $entries cheerio entries that contain phrases
 * @return {string[]} list of phrases
 */
function getPhrases($, $entries) {
    return $entries.find('.phrase')
        .map(function (idx, elem) {
            return $(this).text().trim();
        }).toArray();
}

/**
 * Retrieves phrases from the given entries cheerio object
 * @param $ cheerio reference
 * @param $entries cheerio entries that contain phrases' type
 * @return {string[]} list of types
 */
function getPhrasesTypes($, $entries) {
    return $entries.find('.phrase').siblings('.pos')
        .map(function (idx, elem) {
            return $(this).text().trim();
        }).toArray();
}

/**
 * Retrieves definitions from the given entries cheerio object
 * @param $ cheerio reference
 * @param $entries cheerio entries that contain definitions
 * @return {string[]} list of definitions
 */
function getDefinitions($, $entries) {
    return $entries.find('.def')
        .map(function (idx, elem) {
            return $(this).text().trim();
        }).toArray();
}

/**
 * Maps phrases to definitions
 * @param {string[]} phrases
 * @param {string[]} definitions
 * @param {string[]} types
 * @return {{word: string, definition: string}[]} normalized entries
 */
function normalize(phrases, definitions, types) {
    return phrases.map((phrase, index) => {
        return {
            word: phrase,
            definition: definitions[index],
            type: types[index],
        };
    });
}

/**
 * Retrieves words with definitions
 * @param $ cheerio object that contains vocabulary word entries
 * @return {{word: string, definition: string}[]} word entries
 */
function getWords($) {
    const $entries = $('.wordlist-panel ul li.wordlistentry-row');
    const phrases = getPhrases($, $entries);
    const definitions = getDefinitions($, $entries);
    const types = getPhrasesTypes($, $entries);
    return normalize(phrases, definitions, types);
}

/**
 * Parses the Cambridge public dictionary words list by URL
 * @param {string} url Cambridge public dictionary words list's URL
 * @return {Promise<{word: string, definition: string}[]>} word entries
 */
async function parse(url) {
    const $ = await getPage(url);
    return getWords($);
}

module.exports = parse;