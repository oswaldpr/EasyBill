import {useState} from "react";
import {getProvinceList} from "../data/taxGridFees.js";
import {billing} from "../models/billing.js";
import TableRow from "./tableRow";
import {getCurrencyList} from "../data/currencyApi.js";

export default function BillingTable() {
    const [amount, setAmount] = useState(0);
    const [lang, setLang] = useState('fr');
    const [province, setProvince] = useState('QC');
    const [currency, setCurrency] = useState('CAD');

    const provinceList = getProvinceList(lang);
    let provinceOptionList = provinceList.map((province)=>{
        return <option value={province.key}>{province.value}</option>
    })

    const currencyList = getCurrencyList();
    let currencyOptionList = currencyList.map((currency)=>{
        return <option value={currency}>{currency}</option>
    })

    const billingModel = new billing(amount, province, currency);
    const summaryRow = billingModel.getSummaryRow();
    const headRow = billingModel.getHeaderRow();
    const tableClass = amount > 0 ? 'billing_table section' : 'billing_table section hidden';

    if(amount > 0){
        console.log(billingModel);
    }

    return (
    <div className="App">
      <h1>Easy bill</h1>
      <div className="card">
          <div className="selectors section">
              <div className="amount">
                  <label>Amount: </label>
                  <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))}/>
              </div>
              <div className="purchase_select">
                  <label>Province: </label>
                  <select name="province" onChange={(e) => setProvince(e.target.value)}>
                      {provinceOptionList}
                  </select>
              </div>
              {/*<div className="currency_select">*/}
              {/*    <label>Currency: </label>*/}
              {/*    <select name="currency" onChange={(e) => setCurrency(e.target.value)}>*/}
              {/*        {currencyOptionList}*/}
              {/*    </select>*/}
              {/*</div>*/}
              <button onClick={() => setAmount(0)}>Reset</button>
          </div>
          <table className={tableClass}>
              <thead>
              <tr>
                  {headRow.map((headTitle, id)=>{
                      return <th className={id === 0 ? "title" : ""}>{headTitle}</th>
                  })}
              </tr>
              </thead>
              <tbody>
                  {billingModel.rows.map((singleRow)=>{
                      return <TableRow row={singleRow}/>
                  })}
                  <TableRow row={summaryRow} customClass="summary"/>
              </tbody>
          </table>
      </div>
    </div>
  )
}