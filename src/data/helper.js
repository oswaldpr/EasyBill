import {taxesList} from "./taxGridFees.js";
import {getRate} from "./currencyApi.js";

export function getHeaderRowList(billingModel) {
    let headRow = [];
    if(billingModel){
        const provinceTaxesList = taxesList(billingModel.purchaseState);
        headRow = ['Type', 'Amount'];
        provinceTaxesList.forEach((tax) => {
            headRow.push(tax);
        })
        headRow.push('Total');

        if(billingModel.convCurrency !== 'CAD'){
            headRow.push('Currency');
        }
    }

    return headRow;
}

export function getSummaryRowDefinition(billingModel, title = null) {
    let summaryRow;
    if(billingModel){
        let totalTitle = title || 'Total';
        summaryRow = {
            'title' : totalTitle,
            'amount' : billingModel.subtotal,
            'amountWithTaxes' : billingModel.total,
        };

        if(billingModel.convCurrency !== 'CAD'){
            summaryRow.totalConverted = billingModel.totalConverted;
        }

        const provinceTaxesList = taxesList(billingModel.purchaseState);
        provinceTaxesList.forEach((tax) => {
            summaryRow[tax] = billingModel.taxDetails[tax];
        })
    }

    return summaryRow;
}


async function convertTotal(billingModel) {
    if(billingModel){
        if(billingModel.convCurrency !== 'CAD'){
            let rows = billingModel.rows;
            for (const row of rows) {
                row.totalConverted = await billingModel.convertCurrency(row.amountWithTaxes);
            }
            billingModel.totalConverted = await billingModel.convertCurrency(billingModel.total);
        }
    }
    return billingModel;
}

export function buildConvertedAmountRow(title, amount, conversionRate = 0) {
    const amountConverted = amount * conversionRate;
    return {
        'title': title,
        'amount': amountConverted,
    };
}

export function buildConvertedAmountList(billingModel, conversionRate = 0) {
    let convertedAmountList = [];
    if(billingModel){
        billingModel = typeof billingModel === 'string' ? JSON.parse(billingModel) : billingModel;
        if(billingModel.convCurrency !== 'CAD' && conversionRate > 0){
            let rows = billingModel.rows;
            for (const row of rows) {
                const convertedRow = buildConvertedAmountRow(row.title, row.amountWithTaxes, conversionRate);
                convertedAmountList.push(convertedRow);
            }

            const convertedRow = buildConvertedAmountRow('TotalC', billingModel.total, conversionRate);
            convertedAmountList.push(convertedRow);
        }
    }
    return convertedAmountList;
}