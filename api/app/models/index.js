const dbConfig = require("../config/db.config.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.uri,{ useUnifiedTopology: true, useNewUrlParser: true });

// var mongoose = require('mongoose')
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

var db = mongoose.connection

// add models
db.statechains = require("./statechain.model.js")(mongoose);
db.transactions = require('./transaction.model.js')(mongoose);
db.batchtransfers = require('./batchtransfer.model.js')(mongoose);

module.exports = db;