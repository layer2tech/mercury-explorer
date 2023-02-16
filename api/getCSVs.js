// Run from command line: node -e 'require("./getCSVs").init("https://api.mercurywallet.com/summary")'
const axios = require('axios');
const https = require('https');
const fs = require('fs');
module.exports.init = function (url) {
    hitAPIandSave(url)
};

// hitAPIandSave('https://api.mercurywallet.com/summary')

//This function takes an API URL as a parameter and saves the file to the home directory
function hitAPIandSave(url) {
    //fetch the data from the API
    // Remove second last line of data then saves to file
    // data.csv if url includes summary
    // histogram.csv if url includes histogram

    // At request level
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    axios.get(url,{
        httpsAgent: agent
    }).then(response => {
      //check if the response was successful
      if (response.data) {
        //convert the response to text
        return response.data;
      } else {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
    }).then(data => {
      //remove the second last line
      
      let dataSort = data.split('\n');

      // remove empty last item and last row
      dataSort.splice(-2,1)

      // remove second line (not header)
      // dataSort.splice(1,1);

      //join the lines back together
      let newData = dataSort.join('\n');
      console.log(newData)
      //save the file to the home directory
      if(url.includes('summary')){
        fs.writeFileSync('data.csv', newData);
        console.log('success!: ', newData);
      } if (url.includes('histogram')){
        fs.writeFileSync('histogram.csv', newData);
        console.log('success!: ', newData);
      }
    }).catch(err => {
      console.error(err);
    });
}