const assert = require("assert");
const pgp = require('pg-promise')(/* options */)

let _db;

module.exports = {
    getDb
};

function getDb() {
    if (_db) {
        return _db;
    }
    _db = pgp('postgres://localhost:5432/tstdb');
    console.log("DB initialized");
    return _db;
}
