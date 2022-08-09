import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import BillingTable from "./components/billingTable.jsx";

function App() {

    return (
    <div className="App">
        <div>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <BillingTable />
    </div>
  )
}

export default App
