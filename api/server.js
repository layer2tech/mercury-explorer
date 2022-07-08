const express = require("express");
const cors = require("cors");
const rateLimit = require('express-rate-limit')
const csv = require("./app/controllers/csv.controller.js");
const csv_testnet = require("./app/testnet_controllers/csv.controller.js");

const app = express();

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
// var corsOptions = {
//   origin: "https://testnet-mercury-explorer.netlify.app"
// };


var corsOptions = {
  origin: "*"
}


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/summary", csv.getSummary);
app.get("/histogram", csv.getHistogram);
app.get("/testnet/summary", csv_testnet.getSummary);
app.get("/testnet/histogram", csv_testnet.getSummary);


var whitelist = [ "https://testnet-mercury-explorer.netlify.app",
  "https://explorer.mercurywallet.com",
  "https://testnet.explorer.mercurywallet.com"
]

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

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

https.createServer(options, app).listen(443); 