const dbConfig = require("../config/db.config.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.test_uri,{ useUnifiedTopology: true, useNewUrlParser: true, dbName: "notifications" });

var db = mongoose.connection

// add models
db.statechains = require("./statechain.model.js")(mongoose);
db.transactions = require('./transaction.model.js')(mongoose);
db.batchtransfers = require('./batchtransfer.model.js')(mongoose);
db.statechains_testnet = require("./testnet_statechain.model.js")(mongoose);
db.transactions_testnet = require('./testnet_transaction.model.js')(mongoose);
db.batchtransfers_testnet = require('./testnet_batchtransfer.model.js')(mongoose);

module.exports = db;