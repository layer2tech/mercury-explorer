import './App.css';
import {Router, Switch, Route,Redirect} from 'react-router-dom';
import { TopNavigation, Home, Swap, Address, TransactionID, Transactions, BatchTransfers } from './containers';
import {routes} from './routes';
import appHistory from './app.history';

// Mainstay adds: <Router history={appHistory} />

function App() {
  return (
    <Router history = {appHistory} >
      <div className = "App">
        <TopNavigation />
        <div className = "main">
          <Switch>
            <Route path = {routes.txid} component = {TransactionID} />
            <Route path = {routes.transactions} component = {Transactions} />
            <Route path = {routes.swap} component = {Swap} />
            <Route path = {routes.batch_transfers} component = {BatchTransfers} />
            <Route path = {routes.address} component = {Address} />
            <Route exact path = {routes.app} component = {Home} />
            <Redirect from = "*" to = {routes.app} component = {Home}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
