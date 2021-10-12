module.exports = app => {
  const batchtransfers = require("../controllers/batchtransfer.controller.js");

  var router = require("express").Router();

  // Create a new Statechain - test only
  router.post("/", batchtransfers.create);

  // Retrieve all Statechains
  router.get("/", batchtransfers.findAll);

  // Retrieve a single Statechain with id
  router.get("/:id", batchtransfers.findOne);

  app.use("/api/batchtransfers", router);
};