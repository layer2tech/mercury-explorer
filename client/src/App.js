import './App.css';
import { useEffect, useState } from 'react';
import {Router, Switch, Route,Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { allTxStatus,allBatchStatus, loadAllTx, loadAllBatchTx, allBatchSelector,allTxSelector, summaryStatus, summarySelector, loadSummary, loadHistogramDeposit,loadHistogramWithdraw, depHistoStatus, depHistoSelector, withdrHistoSelector, withdrHistoStatus, batchByDateSelector, recentBatchStatus, batchByDateRecentSelector, loadRecentBatchTx } from './store/features/dataSlice';
import { TopNavigation, Home, Swap, Address, TransactionID, Transactions, BatchTransfers, Footer, TermsConditions, BatchTransfersDate } from './containers';
import {routes} from './routes';
import appHistory from './app.history';

// Mainstay adds: <Router history={appHistory} />

function App() {

  const dispatch = useDispatch()
  const batchTxData = useSelector(batchByDateSelector)
  const batchStatus = useSelector(allBatchStatus)
  const recBatchData = useSelector(batchByDateRecentSelector)
  const recBatchStatus = useSelector(recentBatchStatus)
  const txData = useSelector(allTxSelector)
  const txStatus = useSelector(allTxStatus)
  const summaryData = useSelector(summarySelector)
  const summaryStat = useSelector(summaryStatus)

  const depositHistoStatus = useSelector(depHistoStatus)
  const withdrawHistoStatus = useSelector(withdrHistoStatus)

  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = (eventIgnored) => {
    if (window.pageYOffset >= 5) {

      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
};

  useEffect(() => {
    if(recBatchStatus === "idle"){
        dispatch(loadRecentBatchTx())
    }
    if(txStatus === "idle"){
        dispatch(loadAllTx())
    }
    if(summaryStat === "idle"){
      dispatch(loadSummary())
    }
    if(depositHistoStatus === "idle"){
      dispatch(loadHistogramDeposit())
    }
    if(withdrawHistoStatus === "idle"){
      dispatch(loadHistogramWithdraw())
    }
    if(batchStatus === "idle"){
      dispatch(loadAllBatchTx())
    }
    
  }, [recBatchStatus, batchStatus,txStatus,summaryStat,depositHistoStatus,withdrawHistoStatus,dispatch])

  useEffect(() => {
    let isMounted = true

    const interval = setInterval(() => {
      if (isMounted === true) {
        if(recBatchStatus === "fulfilled" || recBatchStatus === "rejected"){
          dispatch(loadRecentBatchTx())
        }
        if(txStatus === "fulfilled" || txStatus === "rejected"){
            dispatch(loadAllTx())
        }
        if(summaryStat === "fulfilled" || summaryStat === "rejected"){
          dispatch(loadSummary())
        }
        if(depositHistoStatus === "fulfilled" || depositHistoStatus === "rejected"){
          dispatch(loadHistogramDeposit())
        }
        if(withdrawHistoStatus === "fulfilled" || withdrawHistoStatus === "rejected"){
          dispatch(loadHistogramWithdraw())
      }
      if(batchStatus === "fulfilled" || batchStatus === "rejected"){
        dispatch(loadAllBatchTx())
      }
      }
    }, 120000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  },[recBatchStatus, batchStatus,txStatus,summaryStat,depositHistoStatus,withdrawHistoStatus,dispatch])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  })
  return (
    <Router history = {appHistory} >
      <div className = "App">
        <div className = {isScrolled ? ('scroll'):('')}>
          <TopNavigation />
        </div>
        <div className = "main">
          <Switch>
            <Route path = {routes.txid} component = {TransactionID} />

            <Route path = {routes.transactions} component = {Transactions} />

            <Route path = {routes.swap} component = {Swap} />

            <Route path = {routes.batch_transfers} component = {BatchTransfers} />

            <Route path = {routes.batch_transfers_date} component = {BatchTransfersDate} />

            <Route path = {routes.address} component = {Address} />
            
            <Route path = {routes.terms} component = {TermsConditions} />

            <Route exact path = {routes.app} render = {(props) => 
              <Home {...props} txData = {txData} recBatchData = {recBatchData}
                recBatchStatus = {recBatchStatus} txStatus = {txStatus} 
                summaryData = {summaryData} summaryStatus = {summaryStat}/>} />

            <Redirect from = "*" to = {routes.app} render = {(props) => 
              <Home {...props} txData = {txData} recBatchData = {recBatchData}
                recBatchStatus = {recBatchStatus} txStatus = {txStatus} 
                summaryData = {summaryData} summaryStatus = {summaryStat}/>}/>
            <Route component = {Home} />
            {/* <div><h1 className='coming-soon'> Coming soon ... </h1></div> */}
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
