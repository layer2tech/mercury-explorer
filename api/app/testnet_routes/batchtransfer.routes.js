module.exports = app => {
    const batchtransfers_testnet = require("../testnet_controllers/batchtransfer.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Statechains
    router.get("/", batchtransfers_testnet.findAll);
  
    // Retrieve a single Statechain with id
    router.get("/:id", batchtransfers_testnet.findByBatchID);
  
    app.use("/testnet/api/swap", router);
  }; 