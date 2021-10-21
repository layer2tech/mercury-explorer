module.exports = app => {
  const transactions = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  // GET /tx
  /**
  * - address
  * - inserted_at
  * - txid_vout
  */
  router.get("/tx", transactions.findAllTransactions);


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

  router.get("/tx/:id", transactions.findByTxID);

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

  router.get("/address/:id", transactions.findByAddress);

  //GET Sumamry
  router.get("/summary", transactions.getSummary)

  //GET deposit histogram
  router.get("/histo/deposit", transactions.getDepositHistogram)
  
  //GET withdrawal histogram
  router.get("/histo/withdraw", transactions.getWithdrawHistogram)

  app.use("/api", router);
};