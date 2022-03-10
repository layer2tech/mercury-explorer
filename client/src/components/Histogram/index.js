import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import './index.css';

import { depHistoSelector,withdrHistoSelector, fromSatoshi, depHistoStatus, withdrHistoStatus } from '../../store/features/dataSlice';
import { useEffect, useState } from 'react';

// Data in table headers
const data = [{TransactionID: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21,
Statecoin_Address: 'scsdfrtgsrt456345', age:21, txid: '0fsd359sfdf3'}]

const Histogram = (props) => {
    const [data,setData] = useState()
    const withdrawHistoData = useSelector(withdrHistoSelector)
    const depositHistoData = useSelector(depHistoSelector)
    const depositHistoStatus = useSelector(depHistoStatus)
    const withdrawHistoStatus = useSelector(withdrHistoStatus)

    useEffect(()=> {
        let withdrawCount = 0
        let histogram = []
        if(depositHistoStatus === "fulfilled" && withdrawHistoStatus === "fulfilled"){
            depositHistoData.map(item => {
                let withdrawTotal = withdrawHistoData.filter(value => value._id === item._id)
                console.log(withdrawTotal)
                if(item.count >=4 && withdrawTotal[0]){
                    histogram.push({value: item._id, count: (item.count - withdrawTotal[0].count)})
                }
                else if(item.count >=4 ){
                    histogram.push({value: item._id, count: (item.count)})
                }
            })
        }

        setData({
            labels: histogram.map(item => fromSatoshi(item.value)),
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        
                        stepSize: 1
                    }
                }]
            },
            datasets: [
                {
                    label: "Coin Value (BTC)",
                    data: histogram.map(item => item.count),
                    backgroundColor:[
                        "#ffbb11",
                        "#ecf0f1"
                    ],
                }
            ]

        })
        
    },[depositHistoData, withdrawHistoData])


    return(
    <div className = "histogram-component">
        <div className = "histogram-container">
            <h1 className = "histogram-title" >
                {props.title}
            </h1> 
            {data ? (<Bar data = {data}
                options={{
                    plugins: {
                        legend: {
                        display: true,
                        position: "bottom"
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    fontColor: '#E7E7E7'
                                },
                            }],
                          xAxes: [{
                                ticks: {
                                    fontColor: '#E7E7E7'
                                },
                            }]
                        }
                    }}}
                className = "bar-chart"/>) : null }
        </div>
    </div>
    )
}

export default Histogram;