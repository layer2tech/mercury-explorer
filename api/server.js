const express = require("express");
const cors = require("cors");

const app = express();


var corsOptions = {
  origin: "https://testnet-mercury-explorer.netlify.app"
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("Mercury Explorer API Endpoint");
});

require('./app/testnet_routes/transaction.routes')(app);
require('./app/testnet_routes/batchtransfer.routes')(app);
require('./app/routes/transaction.routes')(app);
require('./app/routes/batchtransfer.routes')(app);



// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
