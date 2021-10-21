module.exports = app => {
    const main = require("../controllers/main.controller.js");
  
    var router = require("express").Router();

    // GET /tx
    /**
    * - address ( t )
    * - inserted_at ( t )
    * - txid_vout ( s + t ) JOIN
    */

    // Retrieve all Statechains
    router.get("/tx", main.findAllTransactions);

    // GET /tx/:id
    /**
    * - address ( t )
    * - event ( t )
    * - amount ( t + s )
    * - locktime ( t + s )
    * - txid_vout ( t + s ) JOIN
    * - confirmed ( s )
    * - updated_at ( s )
    * - chain ( s )
    */

    router.get("/tx/:id", main.findByTxID)

    // GET /address/:id
    /**
    * - address ( t )
    * - event ( t)
    * - inserted_at ( t )
    * - amount ( t + s )
    * - locktime ( t + s )
    * - txid_vout ( t + s ) JOIN
    * - confirmed ( s )
    */

    // router.get("/address/:id",main.findByAddress)

    // GET /swap
    /**
    * - batch_id ( bt )
    * - statechain ( bt )
    * - finalized_at ( bt )
    */

    // GET /swap/:id
    /**
    * retrieve:
    * - statechain ( bt )
    * 
    * for each user_id in statechain array
    * return:
    * - address ( t )
    * - amount ( s )
    * - updated_at ( s )
    * - txid_vout ( s )
    */

    // GET /summary
    /**
    * - total coins
    * - total swapped
    * - total value
    * - total withdrawn
    * - total transfers
    */

    // GET /histo/deposit
    /**
    * _id : coin value
    * count: frequency
    */

    // GET GET /histo/withdraw

    app.use("/api", router);
};