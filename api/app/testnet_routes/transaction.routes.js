module.exports = app => {
    const transactions_testnet = require("../testnet_controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    // GET /tx
    /**
    * - address
    * - inserted_at
    * - txid_vout
    */
    router.get("/tx", transactions_testnet.findAllTransactions);
  
  
    // GET /tx/:id
    /**
    * - address
    * - event 
    * - amount 
    * - locktime
    * - txid_vout
    * - confirmed
    * - updated_at
    * - chain
    */
  
    router.get("/tx/:id", transactions_testnet.findByTxID);
  
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
  
    router.get("/address/:id", transactions_testnet.findByAddress);
  
    //GET Sumamry
    router.get("/summary", transactions_testnet.getSummary)
  
    //GET deposit histogram
    router.get("/histo/deposit", transactions_testnet.getDepositHistogram)
  
    //GET withdrawal histogram
    router.get("/histo/withdraw", transactions_testnet.getWithdrawHistogram)
  
    app.use("/testnet/api", router);
  }; 