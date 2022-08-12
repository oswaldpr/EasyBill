import {getCityList} from "../../data/taxGridFees.js";
import {getCurrencyList, getRateDefinition} from "../../data/currencyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {reset, updateAmount, updateCity, updateCurrency, updateDefinitionRate, updateProvince,} from "./billSlice.js";
import {Bid} from "./bid";
import Amount from "../../components/amount";
import {Table} from "./table.jsx";
import {CompanyBill} from "./companyBill";
import {addition} from "../../data/helper";


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

    const cityList = getCityList();
    let cityOptionList = cityList.map((city)=>{
        return <option key={city} value={city}>{city}</option>
    })

    let impactTableHtml = '';
    let companyTableHtml = '';
    let finalHtml = '';
    if(billingModel && amount > 0){
        currency = billingModel.currency;
        totalCAD = billingModel.total > 0 ? billingModel.total : null;
        totalConv = billingModel.totalConverted ? billingModel.totalConverted : null;
        classTotal = totalCAD ? 'width_50' : 'hidden width_50';
        classTotalConv = billingModel.totalConverted === 0 ? 'hidden' : '';

        const bigTotalCAD = addition(billingModel.total, companyBillingModel.total);

        let totalHeadList = ['Impact', 'Senande', 'Total'];
        let totalRowList = [billingModel.total, companyBillingModel.total, bigTotalCAD];
        let totalConvertedList = []

        if(billingModel.convCurrency !== 'CAD'){
            const convCurrency = billingModel.convCurrency;
            const rate = rateDefinition[convCurrency];
            const totalConv = bigTotalCAD * rate;
            const totalConvDevise = parseInt(totalConv) + ' ' + convCurrency;

            totalConvertedList = [billingModel.totalConverted, companyBillingModel.totalConverted, totalConvDevise];
        }

        impactTableHtml = (
            <div>
                <h2 className="section_title">Impact fees</h2>
                <Table model={billingModel}/>
            </div>
        );

        if(companyBillingModel){
            companyTableHtml = (<CompanyBill/>);
        }

        finalHtml = (
            <div>
                <h2 className="section_title">Summary of costs</h2>
                <p className="no-margin">Details of the fees below</p>
                <table className="table bigTotal">
                    <thead>
                    <tr>
                        {totalHeadList.map((headTitle)=>{
                            return <th>{headTitle}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {totalRowList.map((singleRow)=>{
                            return <td><Amount amount={singleRow}/></td>
                        })}
                    </tr>
                    <tr>
                        {totalConvertedList.map((singleRow)=>{
                            return <td><Amount amount={singleRow}/></td>
                        })}
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <h1>Senande <br/> Easy Bill</h1>
            <div className="easy_bill_app">
                <div className="first_screen">
                    <div className="section flex">
                        <div className="amount width_50">
                            <h3>Amount CAD: </h3>
                            <input type="number" value={amount} onChange={(e) => dispatch(updateAmount(e.target.value))}/>
                        </div>

                        <div className={classTotal}>
                            <h3>Cost: </h3>
                            <div>
                                <h2><Amount amount={totalCAD} currency={currency}/></h2>
                                <h2 className={classTotalConv}><Amount amount={totalConv}/></h2>
                            </div>
                        </div>
                    </div>

                    <div className="selectors section flex">
                        <div className="province_select width_50">
                            <div><label>City: </label></div>
                            <select className="size_medium width_50" name="city" onChange={(e) => dispatch(updateCity(e.target.value))}>
                                {cityOptionList}
                            </select>
                        </div>
                        <div className="currency_select width_50">
                            <div><label>Currency: </label></div>
                            <select className="size_medium" name="currency" onChange={(e) => dispatch(updateCurrency(e.target.value))}>
                                {currencyOptionList}
                            </select>
                        </div>
                    </div>

                    <div className="section">
                        <Bid />
                        <button onClick={() => dispatch(reset())}>Reset</button>
                    </div>
                </div>

                <div className="section section_table">
                    {finalHtml}
                </div>

                <div className="section section_table">
                    {impactTableHtml}
                </div>

                {companyTableHtml}
            </div>
        </div>
    )
}