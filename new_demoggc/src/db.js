const route1  = require('../data/cluelist.json');
const route2 = require('../data/itemlist.json');
const route3  = require('../data/valid_mergewordlist.json');
const route4 = require('../data/wordlist.json');
const route5 = require('../data/quiz_1.json')
const route6 = require('../data/quiz_2.json')
const route7 = require('../data/tutorial.json')

module.exports = function() {
return {
    cluelist : route1,
    itemlist : route2,
    mergelist : route3,
    wordlist : route4,
    quiz_1 : route5,
    quiz_2 : route6,
    tutorial : route7
 }
}