import reactLogo from './assets/react.svg'
import './App.css'
import BillingTable from "./components/billingTable.jsx";
import Bill from "./store/bill/bill.jsx";

function App() {

    return (
    <div className="App">
        <div>
            <a><img src={reactLogo} className="logo react" alt="React logo" /></a>
        </div>
        <Bill />
        {/*<BillingTable />*/}
    </div>
  )
}

export default App
