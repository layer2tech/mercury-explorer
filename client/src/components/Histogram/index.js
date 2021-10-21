import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import './index.css';

import { depHistoSelector,withdrHistoSelector, fromSatoshi } from '../../store/features/dataSlice';
import { useEffect, useState } from 'react';

// Data in table headers
const data = [{TransactionID: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21,
Statecoin_Address: 'scsdfrtgsrt456345', age:21, txid: '0fsd359sfdf3'}]

const Histogram = (props) => {
    const [data,setData] = useState()
    const withdrawHistoData = useSelector(withdrHistoSelector)
    const depositHistoData = useSelector(depHistoSelector)

    useEffect(()=> {
        let withdrawCount = 0
        let histogram = []
        
        depositHistoData.map(item => {
            let withdrawTotal = withdrawHistoData.filter(value => value._id === item._id)
            withdrawTotal.map(coin => {

                if( coin.count ) withdrawCount += coin.count
            })
            
            histogram.push({value: item._id, count: (item.count - withdrawCount)})
        })


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
            <Bar data = {data}
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
                className = "bar-chart"/>
        </div>
    </div>
    )
}

export default Histogram;