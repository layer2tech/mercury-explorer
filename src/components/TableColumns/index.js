import { Link } from 'react-router-dom';

import './index.css';

// Data in table headers

const TableColumns = (props) => {
    return(
    <div className = "table-component-holder column-table">
        <div className = "table-container">
            <h1 className = "table-title" >
                {props.title}
            </h1> 
            <div className="mb-3 flex-table">
                <table width="100%" id="table">
                    <thead>
                        <tr>{/* Change key for more readable format */}
                            {Object.keys(props.data[0]).map(key => 
                                <th>{key}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                    {props.data.map((item) =>
                        (item.batch_id !== undefined) ? (
                            <tr key={item.batch_id}>
                                <td>
                                    <Link
                                        className = "link"
                                        to={`/swap/${item.batch_id}`}
                                        title={item.batch_id}
                                    >
                                        {item.batch_id}
                                    </Link>
                                </td>
                                <td>
                                    <span className="text-right ml-1">{item.statechains.length}</span>
                                </td>
                                <td>
                                    <span className="text-right ml-1">{item.finalized_at}</span>
                                </td>
                            </tr>
                        ) : (                            
                        <tr key={item.txid_vout}>
                            <td>
                                <Link
                                    className = "link"
                                    to={`/tx/${item.txid_vout}`}
                                    title={item.txid_vout}
                                >
                                    {item.txid_vout}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    className = "link"
                                    to={`/address/${item.address}`}
                                    title={item.address}
                                >
                                    {item.address}
                                </Link>
                            </td>
                            <td>
                                <span className="text-right ml-1">{item.inserted_at}</span>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </table>
                
                {(props.title === "Batch Transfers" || "Transfers") && 
                    props.data.length < 6 ?
                (<div className = "see-more">
                    <Link className = "see-more-link"
                        to = {props.title === "Transfers" ? '/tx': '/swap'}
                        >
                        <p>See More</p>
                        <img className = "arrow" src = "arrow-up.svg" />
                    </Link>
                </div>)
                :(<div className = "padding-bottom"></div>)}
                
            </div>
        </div>
    </div>
    )
}

export default TableColumns;