import './App.css';
import { useEffect, useState } from 'react';
import {Router, Switch, Route,Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { allTxStatus,allBatchStatus, loadAllTx, loadAllBatchTx, allBatchSelector,allTxSelector, summaryStatus, summarySelector, loadSummary, loadHistogramDeposit,loadHistogramWithdraw, depHistoStatus, depHistoSelector, withdrHistoSelector, withdrHistoStatus } from './store/features/dataSlice';
import { TopNavigation, Home, Swap, Address, TransactionID, Transactions, BatchTransfers, Footer, TermsConditions } from './containers';
import {routes} from './routes';
import appHistory from './app.history';

// Mainstay adds: <Router history={appHistory} />

function App() {
  const dispatch = useDispatch()
  const batchTxData = useSelector(allBatchSelector)
  const batchStatus = useSelector(allBatchStatus)
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
    if(batchStatus === "idle"){
        dispatch(loadAllBatchTx())

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
    
  }, [batchStatus,txStatus,summaryStat,depositHistoStatus,withdrawHistoStatus,dispatch])

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

            <Route path = {routes.address} component = {Address} />
            
            <Route path = {routes.terms} component = {TermsConditions} />

            <Route exact path = {routes.app} render = {(props) => 
              <Home {...props} txData = {txData} batchData = {batchTxData}
                batchStatus = {batchStatus} txStatus = {txStatus} 
                summaryData = {summaryData} summaryStatus = {summaryStat}/>} />

            <Redirect from = "*" to = {routes.app} render = {(props) => 
              <Home {...props} txData = {txData} batchData = {batchTxData}
                batchStatus = {batchStatus} txStatus = {txStatus} 
                summaryData = {summaryData} summaryStatus = {summaryStat}/>}/>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
