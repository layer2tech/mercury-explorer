import { useEffect, useState } from 'react';
import { csv } from 'd3';
import axios from 'axios';
const { REACT_APP_API } = process.env;


const CSV = () => {    
    // const withdrawHistoData = useSelector(withdrHistoSelector)
    // const depositHistoData = useSelector(depHistoSelector)
    // // All deposited coins
    // const depositHistoStatus = useSelector(depHistoStatus)
    // const withdrawHistoStatus = useSelector(withdrHistoStatus)
    // All withdrawn coins
    const [data, setData] = useState([])

    useEffect(()=> {

        const response = axios.get(`${REACT_APP_API}/api/summary`).then(res => {

            let summaryData = res.data;
            
            var csv = JSON.stringify(summaryData)

            var downloadLink = document.createElement("a");

            var blob = new Blob(["\ufeff", csv]);

            var url = URL.createObjectURL(blob);

            downloadLink.href = url;

            downloadLink.download = "data.csv";

            document.body.appendChild(downloadLink);

            downloadLink.click();

            // document.body.removeChild(downloadLink);
        })
        // await axios.get(`${REACT_APP_API}/api/histo/withdraw`)



    },[])
    return(
        <div>
        </div>
    )
}

export default CSV;