import { Link } from 'react-router-dom';
import { tableTitles } from '../../store/features/dataSlice';

import './index.css';

// props.data in table headers

const TableColumns = (props) => {
    function sortDateString(date){
        let dateString
        dateString = date.replace('T', " ")
        dateString = dateString.replace('Z', " ")
        dateString = dateString.slice(0,-5)
        return dateString
    }
    return(
    <div className = "table-component-holder column-table">
        <div className = "table-container">
            <h1 className = "table-title" >
            <div className='header-container'>
                <div className = "icon-container txid"><img src = {props.img} alt = {props.title}/>{props.title}
                </div>
                {props.title==="Transactions"?(<div className="updated-header"><p>Last Updated: {sortDateString(props.data[0].inserted_at)}</p></div>):(null)}
            </div>
            </h1> 
            <div className="mb-3 flex-table">
                <table width="100%" id="table">
                    <thead>
                        <tr>{/* Change key for more readable format */}
                            {Object.keys(props.data[0]).map(key =>{
                                if(key === "inserted_at" || key === "updated_at" ){
                                    return
                                }
                                if(key !== "id" && key !== "_id"){
                                    return <th key = {key}>{tableTitles(key)}</th>
                                }
                            }
                            
                            )}
                        </tr>
                    </thead>
                    <tbody>
                    {props.data.map((item) =>
                        !item.date ?((item.batch_id !== undefined) ? (
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
                                    <span className="text-right ml-1">{sortDateString(item.finalized_at)}</span>
                                </td>
                                <td>
                                    <span className="text-right ml-1">{item.statechains.length}</span>
                                </td>
                                
                            </tr>
                        ) : (                            
                        <tr key={item._id}>
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
                        </tr>)
                    ):(                        
                        <tr key={item.date}>
                            <td>
                                <Link 
                                    className = "link"
                                    to = {`/date/${item.date}`}
                                    title = {item.date}
                                    >
                                    {item.date}
                                </Link>
                            </td>
                            <td>
                                {item.date_data.length}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {(props.title === "Batch Transfers" || props.title === "Transactions") && 
                    props.data.length > 5 &&
                    !window.location.href.includes("swap") &&
                    !window.location.href.includes("tx")?
                (<div className = "see-more">
                    
                    <Link className = "see-more-link"
                        to = {props.title === "Transactions" ? '/tx': '/swap'}
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