import reactLogo from './assets/react.svg'
import './App.css'
import Bill from "./store/bill/bill.jsx";

function App() {

    return (
    <div className="App">
        <div>
            <a><img src={reactLogo} className="logo react" alt="React logo" /></a>
        </div>
        <Bill />
    </div>
  )
}

export default App
