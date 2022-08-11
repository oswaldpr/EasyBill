import {getProvinceList} from "../../data/taxGridFees.js";
import {getCurrencyList, getRateDefinition} from "../../data/currencyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {reset, updateAmount, updateCurrency, updateDefinitionRate, updateProvince} from "./billSlice.js";
import TableRow from "../../components/tableRow.jsx";
import {getHeaderRowList, getSummaryRowDefinition} from "../../data/helper.js";
import {Bid} from "./bid";
import Amount from "../../components/amount";


export default function Bill() {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.bill.lang);
    const amount = useSelector((state) => state.bill.amount);
    const rateDefinition = useSelector((state) => state.bill.rateDefinition);
    let billingModel = useSelector((state) => state.bill.billingModel);
    billingModel = typeof billingModel === 'string' ? JSON.parse(billingModel) : billingModel;
    let totalCAD;
    let totalConv;
    let currency;
    let classTotal = 'hidden';
    let classTotalConv = 'hidden';

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
        currency = billingModel.currency;
        totalCAD = billingModel.total > 0 ? billingModel.total : null;
        totalConv = billingModel.totalConverted ? billingModel.totalConverted : null;
        classTotal = totalCAD ? '' : 'hidden';
        classTotalConv = billingModel.totalConverted === 0 ? 'hidden' : '';

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
        <div>
            <h1>Easy bill</h1>
            <div className="easy_bill_app">
                <div className="section flex">
                    <div className="amount">
                        <h3>Amount CAD: </h3>
                        <input type="number" value={amount} onChange={(e) => dispatch(updateAmount(e.target.value))}/>
                    </div>

                    <div className={classTotal}>
                        <h3>Total: </h3>
                        <div>
                            <h2><Amount amount={totalCAD} currency={currency}/></h2>
                            <h2 className={classTotalConv}><Amount amount={totalConv}/></h2>
                        </div>
                    </div>
                </div>

                <div className="selectors section flex">
                    <div className="province_select width_50">
                        <label>Province: </label>
                        <select className="size_medium width_50" name="province" onChange={(e) => dispatch(updateProvince(e.target.value))}>
                            {provinceOptionList}
                        </select>
                    </div>
                    <div className="currency_select width_50">
                        <label>Currency: </label>
                        <select className="size_medium" name="currency" onChange={(e) => dispatch(updateCurrency(e.target.value))}>
                            {currencyOptionList}
                        </select>
                    </div>
                </div>

                <div className="section">
                    <Bid />
                    <button onClick={() => dispatch(reset())}>Reset</button>
                </div>

                {tableHtml}
            </div>
        </div>
    )
}