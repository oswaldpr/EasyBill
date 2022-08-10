import {getProvinceList} from "../../data/taxGridFees.js";
import {getCurrencyList} from "../../data/currencyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {reset, updateAmount, updateCurrency, updateProvince} from "./billSlice.js";
import TableRow from "../../components/tableRow.jsx";
import {getHeaderRow, getSummaryRow} from "../../data/helper.js";


export default function Bill() {
    const lang = useSelector((state) => state.bill.lang);
    const amount = useSelector((state) => state.bill.amount);
    let billingModel = useSelector((state) => state.bill.billingModel);
    billingModel = typeof billingModel === 'string' ? JSON.parse(billingModel) : billingModel;

    const dispatch = useDispatch();

    const provinceList = getProvinceList(lang);
    let provinceOptionList = provinceList.map((province)=>{
        return <option value={province.key}>{province.value}</option>
    })

    const currencyList = getCurrencyList();
    let currencyOptionList = currencyList.map((currency)=>{
        return <option value={currency}>{currency}</option>
    })

    const headRow = getHeaderRow(billingModel);
    const summaryRow = getSummaryRow(billingModel);
    const tableClass = amount > 0 ? 'billing_table section' : 'billing_table section hidden';

    return (
    <div className="App">
      <h1>Easy bill</h1>
      <div className="card">
          <div className="selectors section">
              <div className="amount">
                  <label>Amount: </label>
                  <input type="number" value={amount} onChange={(e) => dispatch(updateAmount(e.target.value))}/>
              </div>
              <div className="purchase_select">
                  <label>Province: </label>
                  <select key="province" name="province" onChange={(e) => dispatch(updateProvince(e.target.value))}>
                      {provinceOptionList}
                  </select>
              </div>
              <div className="currency_select">
                  <label>Currency: </label>
                  <select key="currency" name="currency" onChange={(e) => dispatch(updateCurrency(e.target.value))}>
                      {currencyOptionList}
                  </select>
              </div>
              <button onClick={() => dispatch(reset())}>Reset</button>
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