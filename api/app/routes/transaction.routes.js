module.exports = app => {
  const transactions = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  // Create a new Statechain - test only
  router.post("/", transactions.create);

  // Retrieve all Statechains
  router.get("/", transactions.findAll);

  // Retrieve a single Statechain with id
  router.get("/:id", transactions.findOne);

  app.use("/api/transactions", router);
};