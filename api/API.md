**API Docs** 

https://api.mercurywallet.com/csv

Updated daily ( every 24h ) at 18:13:04 GMT+0000

* **Method:**
  
  `GET`
  
*  **URL Params**

   /csv

* **Returned Data**

  swapvolume_pastday: integer,
  // number of batch transfers ( swaps ) in the past day
  
  value_sats: integer,
  // total value currently in mercury wallet ( in satoshis )
  
  statecoins_created: integer,
  // All time total number of statecoins
  
  liquidity: integer,
  // Current number of statecoins in mercury wallet
 
  
  tx_pastday: integer,
  // number of transactions in the past day
  
  updated: Unix Timestamp,
  // When data was last updated ( updated every 24 hours )

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** CSV<br />
   _id,swapvolume_pastday,value_sats,statecoins_created,liquidity,tx_pastday,updated
1,45,490300000,310,104,8,1652464931521
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`
