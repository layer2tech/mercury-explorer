module.exports = app => {
  const statechains = require("../controllers/statechain.controller.js");

  var router = require("express").Router();

  // Create a new Statechain - test only
  router.post("/", statechains.create);


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

  router.get("/address", statechains.findByAddress)

  app.use("/api", router);
};