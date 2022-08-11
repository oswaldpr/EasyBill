import {getProvinceList} from "../../data/taxGridFees.js";
import {getCurrencyList, getRateDefinition} from "../../data/currencyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {
    reset,
    updateAmount,
    updateCurrency,
    updateDefinitionRate,
    updateProvince
} from "./billSlice.js";
import TableRow from "../../components/tableRow.jsx";
import {getHeaderRowList, getSummaryRowDefinition} from "../../data/helper.js";
import {Bid} from "./bid";


export default function Bill() {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.bill.lang);
    const amount = useSelector((state) => state.bill.amount);
    const rateDefinition = useSelector((state) => state.bill.rateDefinition);
    let billingModel = useSelector((state) => state.bill.billingModel);
    billingModel = typeof billingModel === 'string' ? JSON.parse(billingModel) : billingModel;

    const currencyList = getCurrencyList();
    let currencyOptionList = currencyList.map((currency)=>{
        if(currency !== 'CAD' && !rateDefinition[currency]){
            getRateDefinition(currency).then((rateDef) => {
                dispatch(updateDefinitionRate(rateDef));
            })
        }
        return <option key={currency} value={currency}>{currency}</option>
    })


    const provinceList = getProvinceList(lang);
    let provinceOptionList = provinceList.map((province)=>{
        return <option key={province.key} value={province.key}>{province.value}</option>
    })

    let tableHtml = '';
    if(billingModel){
        const headRow = getHeaderRowList(billingModel);
        const summaryRow = getSummaryRowDefinition(billingModel);

        const tableClass = amount > 0 ? 'billing_table section' : 'billing_table section hidden';
        tableHtml = (
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
        )
    }

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
                  <select name="province" onChange={(e) => dispatch(updateProvince(e.target.value))}>
                      {provinceOptionList}
                  </select>
              </div>
              <div className="currency_select">
                  <label>Currency: </label>
                  <select name="currency" onChange={(e) => dispatch(updateCurrency(e.target.value))}>
                      {currencyOptionList}
                  </select>
              </div>
              <button onClick={() => dispatch(reset())}>Reset</button>
          </div>
          <Bid />
          {tableHtml}
      </div>
    </div>
  )
}