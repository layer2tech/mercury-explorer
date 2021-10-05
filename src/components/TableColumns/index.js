import { Link } from 'react-router-dom';

import './index.css';

// Data in table headers
const data = [{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21},
{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21},
{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21},
{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21},
{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21},
{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21},
{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21},
{txid: 'asdasdasdgw523445t', merkle_root: 'f34tgfdgd', confirmed: false, age:21}]

const TableColumns = (props) => {
    return(
    <div className = "table-component-holder">
        <div className = "table-container">
            <h1 className = "table-title" >
                Table Columns Title
            </h1> 
            <div className="mb-3 flex-table">
                <table width="100%" id="table">
                    {Object.entries(data).map(([key,value]) => {
                        <tr></tr> 
                        
                    })}
                    <tr>
                        <th>Txid</th>
                        <th>Merkle Root</th>
                        <th>Confirmed</th>
                        <th>Time (UTC)</th>
                    </tr>
                    <tbody>
                    {Object.keys(data).map(({ txid, merkle_root, confirmed, age }) =>
                        <tr key={txid}>
                            <td>
                                <Link
                                    className = "link"
                                    to={`/tx/${txid}`}
                                    title={txid}
                                >
                                    {txid}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    className = "link"
                                    to={`/merkle_root/${merkle_root}`}
                                    title={merkle_root}
                                >
                                    {merkle_root}
                                </Link>
                            </td>
                            <td>
                                <span className="text-right ml-1">{`${!!confirmed}`}</span>
                            </td>
                            <td>
                                <span className="text-right ml-1">{age}</span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default TableColumns;