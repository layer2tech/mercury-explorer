import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import './index.css';

import { depHistoSelector,withdrHistoSelector, fromSatoshi, depHistoStatus, withdrHistoStatus } from '../../store/features/dataSlice';
import { useEffect, useState } from 'react';


const Histogram = (props) => {
    const [data,setData] = useState()
    const withdrawHistoData = useSelector(withdrHistoSelector)
    const depositHistoData = useSelector(depHistoSelector)
    // All deposited coins
    const depositHistoStatus = useSelector(depHistoStatus)
    const withdrawHistoStatus = useSelector(withdrHistoStatus)
    // All withdrawn coins

    useEffect(()=> {
        let withdrawCount = 0
        let histogram = []
        let swapAmounts = [100000,500000,1000000,5000000,10000000,50000000,100000000]
        //x values to show on histogram coin liquidity graph: most commonly used swap values

        if(depositHistoStatus === "fulfilled" && withdrawHistoStatus === "fulfilled"){
            
            depositHistoData.map(item => {
                let withdrawTotal = withdrawHistoData.filter(value => value._id === item._id)
                // Get total withdrawn coins for value of item in depositHistoData

                if(swapAmounts.includes(item._id) && withdrawTotal[0]){
                    let currentLiquidity = item.count - withdrawTotal[0].count
                    if(currentLiquidity !== 0){
                    // If no current liquidity: don't show in graph
                        histogram.push({value: item._id, count: (item.count - withdrawTotal[0].count)})
                        // total deposited - total withdrawn = current liquidity
                    }
                }
                else if(swapAmounts.includes(item._id) ){
                    histogram.push({value: item._id, count: (item.count)})
                    // if coin value has never been withdrawn before then total deposited = current liquidity
                }
            })
        }

        histogram = histogram.sort((a,b) => a.value - b.value)

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