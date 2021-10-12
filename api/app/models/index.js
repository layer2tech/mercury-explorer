const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// add models
db.statechains = require("./statechain.model.js")(mongoose);
db.transactions = require('./transaction.model.js')(mongoose);
db.batchtransfers = require('./batchtransfer.model.js')(mongoose)

module.exports = db;