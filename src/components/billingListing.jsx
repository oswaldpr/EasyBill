import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import {getProvinceList} from "../data/taxGridFees.js";
import {billing} from "../models/billing.js";
import Amount from "./amount.jsx";
import BillingRow from "./billingRow.jsx";
import TaxDetail from "./taxDetail.jsx";

export default function BillingListing() {
    const [amount, setAmount] = useState(0);
    const [lang, setLang] = useState('fr');
    const [province, setProvince] = useState('AB');

    const provinceList = getProvinceList(lang);
    let optionList = provinceList.map((province)=>{
        return <option value={province.key}>{province.value}</option>
    })
    const bill = new billing(amount, province);
    if(amount > 0){
        console.log(bill);
    }

    return (
    <div className="App">
        <div>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>

        <h1>Easy bill</h1>
        <div className="card">
          <div>
              <label>Amount: </label>
              <input type="number" id="amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))}/>
          </div>
          <div>
              <label>Province: </label>
              <select name="province" id="select_province" onChange={(e) => setProvince(e.target.value)}>
                  {optionList}
              </select>
          </div>
          <button onClick={() => setAmount(0)}>Reset</button>

          <div>Amount: <Amount amount={bill.amount}/></div>
          <div>Home currency: {bill.homeCurrency}</div>
          <div>State: {bill.purchaseState}</div>
          {bill.rows.map((singleRow)=>{
              return <BillingRow row={singleRow}/>
          })}

          <div>Subtotal: <Amount amount={bill.subtotal}/></div>
          <TaxDetail row={bill.taxDetails}/>
          <div>Total: <Amount amount={bill.total}/></div>
        </div>
    </div>
  )
}

