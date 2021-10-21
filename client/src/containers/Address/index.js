import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAddress, fromSatoshi } from '../../store/features/dataSlice';
import { TableRows,ContainerTitle } from '../../components';
import './index.css';
import EmptySearch from '../../components/EmptySearch';

const Address = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [refresh,setRefresh] = useState()

    let address = props.match.params.id
    const addressData = useSelector(state => state.data.address_data)
    const addressList = useSelector(state => state.data.address_list)
    const addressStatus = useSelector(state => state.data.address_status)
    

    useEffect(()=> {
        if(!addressList.includes(address)){
            if(addressStatus !== "pending") dispatch(loadAddress(address))
            setRefresh()
        }
        else{

            setData(addressData[addressList.indexOf(address)])
            
        }
    },[data,addressStatus,address,dispatch])

    return( 
        <div>
            {data.length !== 0 ? 
            <div className = "address">
                <ContainerTitle title = {address} info = {`Transactions: ${data.length}`} />
                <div>
                    {/* Change data to a props attribute */}
                    {addressData[addressList.indexOf(address)] ? 
                    data.map(item => {
                        let event = item.event
                        const dataResults = {
                            txid_vout: item.txid_vout,
                            amount: fromSatoshi(item.amount),
                            locktime: item.locktime,
                            inserted_at: item.inserted_at,
                            confirmed: item.confirmed
                        }
                        return (<TableRows data = {[dataResults]} title = {`Event: ${event}`} />)
                    }) : null}
                </div>
            </div> : (
                <EmptySearch />
            )}
        </div>
    )
}

export default Address;