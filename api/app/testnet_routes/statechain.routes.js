module.exports = app => {
    const statechains_testnet = require("../testnet_controllers/statechain.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Statechain - test only
    router.post("/", statechains_testnet.create);
  
  
    // GET /address/:id
    /**
    * - address
    * - event
    * - inserted_at
    * - amount
    * - locktime
    * - txid_vout
    * - confirmed
    */
  
    router.get("/address", statechains_testnet.findByAddress)
  
    app.use("/testnet/api", router);
  }; 