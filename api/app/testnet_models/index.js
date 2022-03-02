const dbConfig = require("../config/db.config.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.test_uri,{ useUnifiedTopology: true, useNewUrlParser: true, dbName: "notifications" });

var db = mongoose.connection

// add models
db.statechains_testnet = require("./statechain.model.js")(mongoose);
db.transactions_testnet = require('./transaction.model.js')(mongoose);
db.batchtransfers_testnet = require('./batchtransfer.model.js')(mongoose);

module.exports = db;