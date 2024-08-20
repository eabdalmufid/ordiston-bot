import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

//wiki
const speech = [
    'Noun',
    'Pronoun',
    'Adjectives',
    'Numerals',
    'Verb',
    'Adverb',
    'Article',
    'Preposition',
    'Conjunction',
    'Interjection',
    'Abbreviation'
];

const patch = (re, s) => {
    re = new RegExp(re, 'ig');
    let k = s.match(re);
    if (k) {
        return k.length;
    } else {
        return 0;
    }
};

const verify_word = async (word) => {
    try {
        const response = await axios.get("https://en.wiktionary.org/w/api.php", {
            params: {
                "action": "query",
                "list": "search",
                "format": "json",
                "utf8": "",
                "srprop": "",
                "srsearch": word,
                "srwhat": "nearmatch"
            }
        });

        const data = response.data.query.search;
        if (data.length === 0) {
            throw new Error('word does not exist');
        } else {
            return data[0].title;
        }
    } catch (error) {
        throw error;
    }
};

const get_wiki_entry = async (word) => {
    try {
        const response = await axios.get("https://en.wiktionary.org/w/index.php", {
            params: {
                "title": word,
                "printable": "yes"
            }
        });

        let dictionary = {
            word: word,
            language: 'en',
            definitions: []
        };

        let $ = cheerio.load(response.data);
        let cnt = 0;
        $('.toc')
            .find('.toclevel-1')
            .each(function(i, elem) {
                if (i === 0) {
                    const text = $(elem).text();
                    for (let x in speech) {
                        cnt += patch(speech[x], text);
                    }
                } else {
                    return;
                }
            });

        $('.mw-parser-output')
            .find('ol')
            .each(function(i, elem) {
                if (i < cnt) {
                    $(elem)
                        .find('ul')
                        .empty();
                    let curspeech = $(elem)
                        .prev()
                        .prev()
                        .text();
                    let onedefinition = {
                        speech: curspeech,
                        lines: []
                    };

                    $(elem)
                        .children()
                        .each(function(i1, elem1) {
                            let print = $(elem1)
                                .text()
                                .split('\n');
                            let oneline = {
                                define: '',
                                examples: []
                            };
                            for (let x in print) {
                                if (x == 0) {
                                    oneline['define'] = print[x];
                                } else {
                                    if (print[x]) {
                                        oneline['examples'].push(print[x]);
                                    }
                                }
                            }
                            onedefinition['lines'].push(oneline);
                        });
                    dictionary['definitions'].push(onedefinition);
                }
            });

        return dictionary;
    } catch (error) {
        throw error;
    }
};

const wiktionaryEn = async (word) => {
    try {
        const word1 = await verify_word(word);
        const dict = await get_wiki_entry(word1);
        return dict;
    } catch (err) {
        throw err;
    }
};

const wiktionaryId = async (word) => {
    const apiUrl = `https://id.wiktionary.org/w/api.php?action=query&format=json&srlimit=10&srsort=relevance&list=search&srsearch=${word}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Gagal mengambil data dari API.');
    }
}
export {
    wiktionaryEn,
    wiktionaryId
};