import './index.css';
import Chart from 'react-google-charts';

// Data in table headers
const data = [{TransactionID: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21,
Statecoin_Address: 'scsdfrtgsrt456345', age:21, txid: '0fsd359sfdf3'}]

const Histogram = (props) => {
    return(
    <div className = "histogram-component">
        <div className = "histogram-container">
            <h1 className = "histogram-title" >
                {props.title}
            </h1> 
            <Chart
                className = "histo-chart"
                width={'620px'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Value (BTC)', 'Amount'],
                    ['2014', 1000],
                    ['2015', 1170],
                    ['2016', 660],
                    ['2017', 1030],
                ]}
                options={{
                    // Material design options
                    hAxis:{
                        title: "Value"
                    },
                    vAxis: {
                        title: "Amount"
                    }
                }}
                // For tests
                rootProps={{ 'data-testid': '2' }}
                />
        </div>
    </div>
    )
}

export default Histogram;