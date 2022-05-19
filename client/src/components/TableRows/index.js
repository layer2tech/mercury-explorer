import { Link } from 'react-router-dom';
import { fromSatoshi, tableTitles } from '../../store/features/dataSlice';

import './index.css';

// Data in table headers
const data = [{TransactionID: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21,
Statecoin_Address: 'scsdfrtgsrt456345', age:21, txid: '0fsd359sfdf3'}]

const TableRows = (props) => {
    return(
    <div className = "table-component-holder">
        <div className = "table-container">
            <h1 className = "table-title" >
                {props.title}
            </h1> 
            <div className="mb-3 flex-table row-table">
                <table width="100%" id="table">
                    <tbody>
                    {Object.entries(props.data[0]).map(([key,value]) => {
                        if(key === "inserted_at" || key === "updated_at" ){
                            return
                        }
                        if(key !== "_id"){
                            return(
                            <tr key={value}>
                                {/* Add Link if required for each key */}
                                <th>
                                    {tableTitles(key)}
                                    {/* Make object that converts key
                                    to readable  heading format*/}
                                </th>
                                {value === undefined ? (
                                <td>
                                    <span className="text-right ml-1"> - </span>    
                                </td>
                                ):( key === "address" || key === "txid_vout" ? (
                                    <td>
                                        <Link
                                            className = "link"
                                            to={key === "address" ? `/address/${value}` : `/tx/${value}`}
                                            title={value}>
                                            {value}
                                        </Link>
                                    </td>
                                ):(
                                    <td>
                                        <span className="text-right ml-1">{key === "total_deposit" ||  key === "total_withdrawn" ? fromSatoshi(value) : `${value}`}</span>    
                                    </td>
                                ))}
                                
                            </tr>)
                        }
                    })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default TableRows;