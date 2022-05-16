**API Docs** 

https://api.mercurywallet.com/summary

Updated daily ( every 24h ) at 00:00:00 GMT+0000

* **Method:**
  
  `GET`
  
*  **URL Params**

   /summary

* **Returned Data**

  swaps_per_day: integer,
  • Number of swaps completed in a day.
  
  capacity_statechains: integer,
  • Total value currently in mercury wallet ( in satoshis )
  • The sum value of every coin deposited by every user 
  
  statecoins: integer,
  • All time total number of statecoins
  
  liquidity: integer,
  • Current number of statecoins in mercury wallet
 
  swapset_per_day: integer,
  • Total number of coins involved in a swap
  • Differing from the swaps_per_day, the swapset per day is the sum of every coin participating in every swap
    - i.e. 2 swaps completed of 5 coins would have a swapset of 10
    - A larger swapset means better privacy
    - If you swap at the beginning of a day where 10 swaps ocurred, each with 5 coins
      there are potentially 50 people who could have ownership of your original coin.
    - If a particular day has a swapset of 1000, there are 1000 people who could have ownership of your coin.
  
  updated: Timestamp,
  • When data was last updated ( updated every 24 hours )

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** CSV<br />
   swaps_per_day,capacity_statechains,statecoins,liquidity,swapset_per_day,updated <br />
    18,490400000,316,105,36,Mon May 16 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


https://api.mercurywallet.com/histogram

Updated daily ( every 24h ) at 00:00:00 GMT+0000

* **Method:**
  
  `GET`
  
*  **URL Params**

   /histogram

* **Returned Data**

  100000,500000,1000000,5000000,10000000,50000000: integer,
  • Each header is an amount in satoshis
  • The values are the # of statecoins currently in a mercury wallet of each value
    - liquidity per value
  
  updated: Timestamp,
  • When data was last updated ( updated every 24 hours )

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** CSV<br />
   100000,500000,1000000,5000000,10000000,50000000,updated <br />
    47,24,5,17,8,3,Mon May 16 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
    50,22,7,18,12,5,Tues May 17 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`
