module.exports = app => {
  const batchtransfers = require("../controllers/batchtransfer.controller.js");

  var router = require("express").Router();

  // Retrieve all Statechains
  router.get("/", batchtransfers.findAll);

  // Retrieve a single Statechain with id
  router.get("/:id", batchtransfers.findByBatchID);

  app.use("/api/swap", router);
};