import { useSelector } from 'react-redux'
import Amount from "../../components/amount.jsx";
import {addition} from "../../data/helper.js";

export function BigTotal() {
    const billingModel = useSelector((state) => state.bill.billingModel)
    const companyBillingModel = useSelector((state) => state.bill.companyBillingModel)
    const rateDefinition = useSelector((state) => state.bill.rateDefinition);

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

    return (
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