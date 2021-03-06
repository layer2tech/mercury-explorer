**API Docs** 

* **Method:**
  
  `GET`
  
  https://api.mercurywallet.com/summary

  Updated daily ( every 24h ) at 00:00:00 GMT+0000
  
  Data for up to 30 days will be cached and returned
  
*  **URL Params**

   /summary

* **Returned Data**

  swaps_per_day: integer,<br/>
  • Number of swaps completed in a day.<br/>
  
  capacity_statechains: integer,<br/>
  • Total value currently in mercury wallet ( in satoshis )<br/>
  
  statecoins: integer,<br/>
  • All time total number of statecoins
  
  liquidity: integer,<br/>
  • Current number of statecoins in mercury wallet<br/>
 
  swapset_per_day: integer,<br/>
  • Total number of coins involved in a swap <br />
  • Differing from the swaps_per_day, the swapset per day is the sum of every coin participating in every swap <br/>
    - i.e. 2 swaps of 5 coins has a swapset of 10<br/>
    - A larger swapset means better privacy. <br/>
    - A larger swapset is a larger number of potential owners of any coin swapped on that day.
  
  updated: Timestamp,<br/>
  • When data was last updated ( updated every 24 hours )

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** CSV<br />
   swaps_per_day,capacity_statechains,statecoins,liquidity,swapset_per_day,updated <br />
    18,490400000,316,105,36,Mon May 16 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`



* **Method:**
  
  `GET`
  
  https://api.mercurywallet.com/histogram

  Updated daily ( every 24h ) at 00:00:00 GMT+0000
  
  Data for up to 30 days will be cached and returned
  
*  **URL Params**

   /histogram

* **Returned Data**

  **Liquidity per value of a statecoin.**
  
  • Each header is an amount in satoshis <br />
  • The values are the # of statecoins currently in a mercury wallet of each value<br/>
  
  updated: Timestamp,<br/>
  • The date and time that each row of data was collected ( updated every 24 hours )
  
    
  NOTE:
  
  Values shown are the values recommended for swaps.
  Statecoins of other values exist in Mercury as users can deposit a custom value.

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** CSV<br />
   100000,500000,1000000,5000000,10000000,50000000,updated <br />
    47,24,5,17,8,3,Mon May 16 2022 00:00:00 GMT+0000 (Coordinated Universal Time)<br/>
    50,22,7,18,12,5,Tues May 17 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`
