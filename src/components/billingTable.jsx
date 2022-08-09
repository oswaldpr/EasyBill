import {useState} from "react";
import {getProvinceList} from "../data/taxGridFees.js";
import {billing} from "../models/billing.js";
import TableRow from "./tableRow";

export default function BillingTable() {
    const [amount, setAmount] = useState(0);
    const [lang, setLang] = useState('fr');
    const [province, setProvince] = useState('QC');

    const provinceList = getProvinceList(lang);
    let optionList = provinceList.map((province)=>{
        return <option value={province.key}>{province.value}</option>
    })

    const billingModel = new billing(amount, province);
    const summaryRow = billingModel.getSummaryRow();
    // const headRow = ['Type', 'Amount', 'GST', 'PST', 'HST', 'QST', 'Other tax', 'Total']
    const headRow = ['Type', 'Amount', 'GST', 'HST', 'QST', 'Total']
    if(amount > 0){
        console.log(billingModel);
    }

    return (
    <div className="App">
      <h1>Easy bill</h1>
      <div className="card">
          <div>
              <label>Amount: </label>
              <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))}/>
          </div>
          <div>
              <label>Province: </label>
              <select name="province" onChange={(e) => setProvince(e.target.value)}>
                  {optionList}
              </select>
          </div>
          <button onClick={() => setAmount(0)}>Reset</button>
          <table>
              <thead>
              <tr>
                  {headRow.map((headTitle)=>{
                      return <th>{headTitle}</th>
                  })}
              </tr>
              </thead>
              <tbody>
                  {billingModel.rows.map((singleRow)=>{
                      return <TableRow row={singleRow}/>
                  })}
                  <TableRow row={summaryRow}/>
              </tbody>
          </table>
      </div>
    </div>
  )
}