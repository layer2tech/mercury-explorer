const db = require("../models");
const Transaction = db.transactions;
const fs = require('fs');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const CSVFileValidator = require('csv-file-validator');

let summaryVar
let histogramVar

const csvSummary = createCsvWriter({
  path: './data.csv',
  header: [ "swaps_per_day", "capacity_statechains", "statecoins", "liquidity", "swapset_per_day", "updated" ]
})

const csvHistogram = createCsvWriter({
  path: './histogram.csv',
  header: [ "100000", "500000", "1000000", "5000000","10000000", "50000000", "updated" ]
})


exports.getSummary = (req,res) => {

    let yesterday = new Date(Date.now() - 8.6E7).toISOString();
    // the date yesterday

    let today = new Date(Date.now()).toISOString();
    // the date today

    yesterday = yesterday.slice(0,10);
    // the date in format : YYYY-MM-DD

    let ydayUnix = new Date(yesterday).getTime();

    today = today.slice(0,10);
    // the date in format : YYYY-MM-DD

    let todayUnix = new Date(today).getTime();

    const pipeline = [
      {
        '$group': {
          '_id': 1,
          'total_deposit': {
            '$sum': '$amount'
          },
          'deposited_coins': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'transactions',
          'localField': 'string',
          'foreignField': 'string',
          'as': 'transactions'
        }
      }, {
        '$unwind': '$transactions'
      }, {
        '$match': {
          'transactions.event': 'WITHDRAWAL'
        }
      }, {
        '$group': {
          '_id': 1,
          'total_deposit': {
            '$first': '$total_deposit'
          },
          'deposited_coins': {
            '$first': '$deposited_coins'
          },
          'total_withdrawn': {
            '$sum': '$transactions.amount'
          },
          'withdrawn_coins': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'batchtransfers', 
          'localField': 'string', 
          'foreignField': 'string', 
          'as': 'batchtransfers'
        }
      }, {
        '$unwind': '$batchtransfers'
      }, {
        '$project': {
          'liquidity': {
            '$subtract': [
              '$deposited_coins', '$withdrawn_coins'
            ]
          }, 
          'capacity_statechains': {
            '$subtract': [
              '$total_deposit', '$total_withdrawn'
            ]
          }, 
          'statecoins': '$deposited_coins', 
          'pastday_batch': '$batchtransfers.finalized_at', 
          'batchtransfers': '$batchtransfers'
        }
      }, {
        '$match': {
          'pastday_batch': {
            '$gt': new Date(yesterday), 
            '$lt': new Date(today)
          }
        }
      }, {
        '$group': {
          '_id': '$_id', 
          'swaps_per_day': {
            '$sum': 1
          }, 
          'capacity_statechains': {
            '$first': '$capacity_statechains'
          }, 
          'statecoins': {
            '$first': '$statecoins'
          }, 
          'liquidity': {
            '$first': '$liquidity'
          }, 
          'batchtransfers': {
            '$push': '$batchtransfers'
          }
        }
      }, {
        '$lookup': {
          'from': 'transactions', 
          'localField': 'string', 
          'foreignField': 'string', 
          'as': 'transactions'
        }
      }, {
        '$unwind': '$transactions'
      },{
        '$match': {
          'transactions.inserted_at': {
            $gt: ydayUnix,
            $lt: todayUnix
            }
          }
        },
        {
        '$group': {
          '_id': '$_id', 
          'swaps_per_day': {
            '$first': '$swaps_per_day'
          },
          'capacity_statechains': {
            '$first': '$capacity_statechains'
          },
          'statecoins': {
            '$first': '$statecoins'
          },
          'liquidity': {
            '$first': '$liquidity'
          }
          // 'tx_pastday': {
          //   '$sum': 1
          // }
          }        
        }, {
          '$lookup': {
            'from': 'batchtransfers', 
            'localField': 'string', 
            'foreignField': 'string', 
            'as': 'batchtransfers'
          }
        }, {
          '$unwind': '$batchtransfers'
        }, {
          '$unwind': '$batchtransfers.statechains'
        }
        , {
          '$unwind': '$batchtransfers.statechains'
        }, {
          '$match': {
            'batchtransfers.finalized_at': {
              '$gt': new Date(yesterday), 
              '$lt': new Date(today)
            }
          }
        },
        {
        '$group': {
          '_id': '$_id', 
          'swaps_per_day': {
            '$first': '$swaps_per_day'
          },
          'capacity_statechains': {
            '$first': '$capacity_statechains'
          },
          'statecoins': {
            '$first': '$statecoins'
          },
          'liquidity': {
            '$first': '$liquidity'
          },
          'swapset_per_day': {
            '$sum': 1
          }
          }        
        }
    ]

    let date = Date.now();
    let updated

    if(summaryVar) {
      updated =  summaryVar[0].updated.getTime()
    }

    if( summaryVar  && (date - updated <= 8.6E7 )){
      // If static saved in last day - dont query db
      console.log('From Static Variable - Summary')

      res.download('./data.csv', function(error){
        if(error) console.log("Error : ", error)
      })

    }
    else{
      console.log('From DB Summary')

      Transaction.aggregate(pipeline)
        .then(data => {
          
          console.log("data collected from db summary")
          data[0].updated = new Date(today);
          // data[0].updated = new Date()
          delete data[0]["_id"]

          summaryVar = data;
          
          csvSummary.writeRecords([Object.values(data[0])]).then(
            item =>{
              res.download('./data.csv', function(error){
                if(error) console.log("Error : ", error)
              })
            }
          ).catch(err => {console.log("ERROR", err)})
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "error occurred while finding Summary"
            });
        });
    }
  }

exports.getHistogram = (req,res) => {

  let today = new Date(Date.now()).toISOString();
  // the date today

  today = today.slice(0,10);
  // the date in format : YYYY-MM-DD

  let todayUnix = new Date(today).getTime();

  const deposit = [
    {
      '$match': {
        'transactions.event': {
          '$ne': 'WITHDRAWAL'
        }
      }
    },
    {
      '$group': {
        '_id': '$amount', 
        'count': {
          '$sum': 1
        }
      }
    }
  ]

  const withdraw = [
    {
      '$match': {
        'event': 'WITHDRAWAL'
      }
    }, {
      '$group': {
        '_id': '$amount', 
        'count': {
          '$sum': 1
        }
      }
    }
  ]

  let date = Date.now();
  let updated

  if(histogramVar){
    histogramVar.map(item => {

        if(item["updated"]) updated = item["updated"].getTime()
      })
  }

  if(histogramVar && ((date - updated)) <= 3000){8.6E7
    // If static saved in last day - dont query db
    console.log('From Static Variable')

    res.download('./histogram.csv', function(error){
      if(error) console.log("Error : ", error)
    })
  } else {
    Transaction.aggregate(deposit)
      .then( depositData => {
        Transaction.aggregate(withdraw)
        .then( withdrawData => {
          let swapAmounts = [100000,500000,1000000,5000000,10000000,50000000,100000000];

          let histogram = [];
          depositData.map(item => {
            let withdrawTotal = withdrawData.filter(value => value._id === item._id)
            // Get total withdrawn coins for value of item in depositData
  
            if(swapAmounts.includes(item._id) && withdrawTotal[0]){
                let currentLiquidity = item.count - withdrawTotal[0].count
                if(currentLiquidity !== 0){
                // If no current liquidity: don't show in graph
                    histogram.push({[item._id]: (item.count - withdrawTotal[0].count)})
                    // total deposited - total withdrawn = current liquidity
                }
            }
            else if(swapAmounts.includes(item._id) ){
                histogram.push({[item._id]: (item.count)})
                // if coin value has never been withdrawn before then total deposited = current liquidity
            }
            })
  
          histogram.sort( (a,b) => Object.values(b)[0] - Object.values(a)[0] )

          histogram.push({"updated": new Date(today)})

          histogramVar = histogram
          // Save static variable
          
          csvHistogram.writeRecords([histogram.map(item => Object.values(item))])
            .then(  item =>{
                res.download('./histogram.csv', function(error){
                  if(error) console.log("Error : ", error)
                })
            }
          ).catch(err => {console.log("ERROR", err)})
  
        })
        .catch(err => {
          res.status(500).send({
          message:
              err.message || "error occurred while finding Transaction"
          });
        });
      })
      .catch(err => {
        res.status(500).send({
        message:
            err.message || "error occurred while finding Transaction"
        });
      });
  }
}