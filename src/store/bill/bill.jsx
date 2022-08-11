import {getProvinceList} from "../../data/taxGridFees.js";
import {getCurrencyList, getRateDefinition} from "../../data/currencyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {reset, updateAmount, updateCurrency, updateDefinitionRate, updateProvince,} from "./billSlice.js";
import {Bid} from "./bid";
import Amount from "../../components/amount";
import {Table} from "./table.jsx";
import {CompanyBill} from "./companyBill";


export default function Bill() {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.bill.lang);
    const amount = useSelector((state) => state.bill.amount);
    const rateDefinition = useSelector((state) => state.bill.rateDefinition);
    let billingModel = useSelector((state) => state.bill.billingModel);
    billingModel = typeof billingModel === 'string' ? JSON.parse(billingModel) : billingModel;
    let companyBillingModel = useSelector((state) => state.bill.companyBillingModel);
    companyBillingModel = typeof companyBillingModel === 'string' ? JSON.parse(companyBillingModel) : companyBillingModel;

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

    let impactTableHtml = '';
    let companyTableHtml = '';
    if(billingModel){
        currency = billingModel.currency;
        totalCAD = billingModel.total > 0 ? billingModel.total : null;
        totalConv = billingModel.totalConverted ? billingModel.totalConverted : null;
        classTotal = totalCAD ? 'width_50' : 'hidden width_50';
        classTotalConv = billingModel.totalConverted === 0 ? 'hidden' : '';

        impactTableHtml = (<Table model={billingModel}/>);

        if(companyBillingModel){
            companyTableHtml = (<CompanyBill/>);
        }
    }

    return (
        <div>
            <h1>Easy bill</h1>
            <div className="easy_bill_app">
                <div className="section flex">
                    <div className="amount width_50">
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

                <div className="section section_table">
                    {impactTableHtml}
                </div>

                {companyTableHtml}
            </div>
        </div>
    )
}