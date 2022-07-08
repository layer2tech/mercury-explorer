import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';

const { REACT_APP_API } = process.env;


type BatchTxArray = BatchTx[];

export interface DataValue {
    summary: any
    summary_status: string
    depositHisto: any
    depositHisto_status: string
    withdrHisto: any
    withdrHisto_status: string
    tx: any
    tx_status: string
    batch_tx: BatchTxArray
    sorted_batch_tx: any
    batch_status: string
    batch_tx_recent: BatchTxArray
    sorted_batch_tx_recent: any
    batch_status_recent: string
    address_list: any
    address_data: any
    address_status: string
    batch_id_list: any
    batch_id_data: any
    batch_id_status: string
    txid_list: any
    txid_data: any
    txid_status: string
}
export interface BatchTx {
    batch_id: string,
    finalized_at: string,
    id: string,
    statechains: string[]
}

const initialState: DataValue = {
    summary: [],
    summary_status: "idle",
    depositHisto: [],
    depositHisto_status: "idle",
    withdrHisto: [],
    withdrHisto_status: "idle",
    tx: [],
    tx_status: "idle",
    batch_tx: [],
    sorted_batch_tx: [],
    batch_status: "idle",
    batch_tx_recent: [],
    sorted_batch_tx_recent: [],
    batch_status_recent: "idle",
    address_list: [],
    address_data: [],
    address_status: "idle",
    batch_id_list: [],
    batch_id_data: [],
    batch_id_status: "idle",
    txid_list: [],
    txid_data: [],
    txid_status: "idle",

}

export const summarySelector = (state: RootState) => state.data.summary

export const summaryStatus = (state: RootState) => state.data.summary_status

export const depHistoSelector = (state: RootState) => state.data.depositHisto

export const depHistoStatus = (state: RootState) => state.data.depositHisto_status

export const withdrHistoSelector = (state: RootState) => state.data.withdrHisto

export const withdrHistoStatus = (state: RootState) => state.data.withdrHisto_status

export const allBatchSelector = (state: RootState) => state.data.batch_tx

export const batchByDateSelector = (state: RootState) => state.data.sorted_batch_tx

export const allBatchStatus = (state: RootState) => state.data.batch_status

export const recentBatchSelector = (state: RootState) => state.data.batch_tx_recent

export const batchByDateRecentSelector = (state: RootState) => state.data.sorted_batch_tx_recent

export const recentBatchStatus = (state: RootState) => state.data.batch_status_recent

export const allTxSelector = (state: RootState) => state.data.tx

export const allTxStatus = (state: RootState) => state.data.tx_status

//Example of Async thunk below for fetching data
// Redux Counter example:

export const loadSummary = createAsyncThunk('data/loadSummary', async () => {
    const response = await axios.get(`${REACT_APP_API}/api/summary`)
    return response.data
})

export const loadHistogramDeposit = createAsyncThunk('data/loadHistogramDeposit', async () => {
    const response = await axios.get(`${REACT_APP_API}/api/histo/deposit`)

    return response.data
})

export const loadHistogramWithdraw = createAsyncThunk('data/loadHistogramWithdraw', async () => {
    const response = await axios.get(`${REACT_APP_API}/api/histo/withdraw`)
    return response.data
})

export const loadAllBatchTx = createAsyncThunk('data/loadAllBatchTx', async () => {
    const response = await axios.get(`${REACT_APP_API}/api/swap`)
    let data: BatchTxArray = response.data.sort((a: any ,b: any) => {
        let aTime = new Date(a.finalized_at).getTime()
        let bTime = new Date(b.finalized_at).getTime()
        return bTime - aTime
    })

    return data
})

export const loadRecentBatchTx = createAsyncThunk('data/loadRecentBatchTx', async () => {
    const response = await axios.get(`${REACT_APP_API}/api/swap/recent`)

    let data: BatchTxArray = response.data.sort((a: any ,b: any) => {
        let aTime = new Date(a.finalized_at).getTime()
        let bTime = new Date(b.finalized_at).getTime()
        return bTime - aTime
    })

    return data
})

export const loadAllTx = createAsyncThunk('data/loadAllTx', async () => {
    
    const response = await axios.get(`${REACT_APP_API}/api/tx`)

    let data = response.data.sort((a: any ,b: any) => {
        let aTime = new Date(a.inserted_at).getTime()
        let bTime = new Date(b.inserted_at).getTime()
        return bTime - aTime
    })

    return data
})

export const loadAddress = createAsyncThunk('data/loadAddress', async (address) => {
    const response = await axios.get(`${REACT_APP_API}/api/address/${address}`)
    return [response.data, address]
})

export const loadBatchTx = createAsyncThunk('data/loadBatchTx', async (batch_id) => {
    const response = await axios.get(`${REACT_APP_API}/api/swap/${batch_id}`)
    return [response.data, batch_id]
})

export const loadTx = createAsyncThunk('data/loadTx', async (txid) => {
    const response = await axios.get(`${REACT_APP_API}/api/tx/${txid}`)
    return [response.data, txid]
})


export const tableTitles = (title : string) => {

    switch(title){
        case "txid_vout":
            return "Tx ID"
        case "batch_id":
            return "Batch ID"
        case "address":
            return "Address"
        case "date":
            return "Date"
        case "date_data":
            return "Total Swaps"
        case "locktime":
            return "Expiry Time"
        case "amount":
            return "Amount (BTC)"
        case "confirmed":
            return "Confirmed"
        case "event":
            return "Event"
        case "statechains":
            return "Swap Size"
        case "inserted_at":
            //return "Inserted"
            return "Last Updated"
        case "updated_at":
            //return "Updated"
            return "Last Updated"
        case "finalized_at":
            //return "Finalized"
            return "Last Updated"
        case "total_coins":
            return "Coins Volume"
        case "total_deposit":
            return "Total Deposited (BTC)"
        case "total_withdrawn":
            return "Total Withdrawn (BTC)"
        case "deposited_coins":
            return "Statecoins Deposited"
        case "total_swapped":
            return "Total Swapped"
        default:
            return title
    }
}

// Satoshi value -> BTC value
export const fromSatoshi = (sat: number) => { return sat / 10e7 }

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        //For mutating state
    },

    //Actions generated by createAsyncThunk to stored here
    extraReducers: (builder)=> {
        builder
            .addCase(loadSummary.fulfilled, (state,action) => {
                state.summary = action.payload
                state.summary_status = "fulfilled"
            })
            .addCase(loadSummary.pending, (state,action) => {
                state.summary_status = "pending"
            })
            .addCase(loadSummary.rejected, (state,action) => {
                state.summary_status = "rejected"
            })
            .addCase(loadHistogramDeposit.fulfilled, (state,action) => {
                const depositHist = action.payload
                state.depositHisto = depositHist
                state.depositHisto_status = "fulfilled"
            })
            .addCase(loadHistogramDeposit.pending, (state,action) => {
                state.depositHisto_status = "pending"
            })
            .addCase(loadHistogramDeposit.rejected, (state,action) => {
                state.depositHisto_status = "rejected"
            })
            .addCase(loadHistogramWithdraw.fulfilled, (state,action) => {
                const withdrawHist = action.payload
                state.withdrHisto = withdrawHist
                state.withdrHisto_status = "fulfilled"
            })
            .addCase(loadHistogramWithdraw.pending, (state,action) => {
                state.withdrHisto_status = "pending"
            })
            .addCase(loadHistogramWithdraw.rejected, (state,action) => {
                state.withdrHisto_status = "rejected"
            })
            .addCase(loadAllBatchTx.fulfilled, (state,action) => {
                state.batch_tx = action.payload

                let dates:any[] = []
                let sortedBatchTx: any[] = []

                state.batch_tx.map((tx: BatchTx) => {
                    let date = tx.finalized_at.slice(0,10)
                    if(!dates.includes(date)){
                        dates.push(date)
                    }
                })
                dates.map(( date: string ) => {
                    let countArray = state.batch_tx.filter( ( tx:any ) => tx.finalized_at.slice(0,10) === date)
                    sortedBatchTx.push({
                        date: date,
                        date_data: countArray
                    })
                })
                state.sorted_batch_tx = sortedBatchTx
                state.batch_status = "fulfilled"
            })
            .addCase(loadAllBatchTx.pending, (state,action) => {
                state.batch_status = "pending"
            })
            .addCase(loadAllBatchTx.rejected, (state,action) => {
                state.batch_status = "rejected"
            })
            .addCase(loadRecentBatchTx.fulfilled, (state,action) => {
                state.batch_tx_recent = action.payload

                let dates:any[] = []
                let sortedBatchTx: any[] = []

                state.batch_tx_recent.map((tx: BatchTx) => {
                    let date = tx.finalized_at.slice(0,10)
                    if(!dates.includes(date)){
                        dates.push(date)
                    }
                })
                dates.map(( date: string ) => {
                    let countArray = state.batch_tx_recent.filter( ( tx:any ) => tx.finalized_at.slice(0,10) === date)
                    sortedBatchTx.push({
                        date: date,
                        date_data: countArray
                    })
                })
                state.sorted_batch_tx_recent = sortedBatchTx
                state.batch_status_recent = "fulfilled"
            })
            .addCase(loadRecentBatchTx.pending, (state,action) => {
                state.batch_status_recent = "pending"
            })
            .addCase(loadRecentBatchTx.rejected, (state,action) => {
                state.batch_status_recent = "rejected"
            })
            .addCase(loadAllTx.fulfilled, (state,action) => {
                state.tx = action.payload
                state.tx_status = "fulfilled"
            })
            .addCase(loadAllTx.pending, (state,action) => {
                state.tx_status = "pending"
            })
            .addCase(loadAllTx.rejected, (state,action) => {
                state.tx_status = "rejected"
            })
            .addCase(loadAddress.fulfilled, (state,action) => {
                const [data,address] = action.payload
                state.address_list.push(address)
                state.address_data.push(data)
                state.address_status = "fulfilled"

            })
            .addCase(loadAddress.pending, (state,action) => {
                state.address_status = "pending"
            })
            .addCase(loadAddress.rejected, (state,action) => {
                state.address_status = "rejected"
            })
            .addCase(loadBatchTx.fulfilled, (state,action) => {
                const [data,batch_id] = action.payload
                state.batch_id_list.push(batch_id)
                state.batch_id_data.push(data)
                state.batch_id_status = "fulfilled"

            })
            .addCase(loadBatchTx.pending, (state,action) => {
                state.batch_id_status = "pending"
            })
            .addCase(loadBatchTx.rejected, (state,action) => {
                state.batch_id_status = "rejected"
            })

            .addCase(loadTx.fulfilled, (state,action) => {
                const [data,txid] = action.payload
                state.txid_list.push(txid)
                state.txid_data.push(data)
                state.txid_status = "fulfilled"

            })
            .addCase(loadTx.pending, (state,action) => {
                state.txid_status = "pending"
            })
            .addCase(loadTx.rejected, (state,action) => {
                state.txid_status = "rejected"
            })
        
    }
})

//export const { #All Actions Here } = dataSlice.actions

// Add selectors here for useSelector function in React app

// Add Thunks here

export default dataSlice.reducer