module.exports = app => {
  const statechains = require("../controllers/statechain.controller.js");

  var router = require("express").Router();

  // Create a new Statechain - test only
  router.post("/", statechains.create);

  // Retrieve all Statechains
  router.get("/", statechains.findAll);

  // Retrieve a single Statechain with id
  router.get("/:id", statechains.findOne);

  app.use("/api/statechains", router);
};