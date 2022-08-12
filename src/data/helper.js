import {taxesList} from "./taxGridFees.js";
import {billing} from "../models/billing.js";
import {initCompanyFeesRows} from "./companyGridFees.js";

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

export function addition(value1, value2){
    return parseFloat(value1) + parseFloat(value2)
}

export function executeConversion(billingModel, rateDefinition = 0) {
    if(billingModel){
        billingModel = typeof billingModel === 'string' ? JSON.parse(billingModel) : billingModel;
        const currency = billingModel.convCurrency;
        const conversionRate = rateDefinition[currency];
        if(billingModel.convCurrency !== 'CAD' && conversionRate > 0){
            let rows = billingModel.rows;
            for (const row of rows) {
                row.convCurrency = currency;
                const totalConverted = row.amountWithTaxes * conversionRate;
                row.totalConverted = totalConvertedDisplay(totalConverted, currency);
            }

            const totalConverted = billingModel.total * conversionRate;
            billingModel.totalConverted = totalConvertedDisplay(totalConverted, currency);
        }
    }

    return billingModel;
}

function totalConvertedDisplay(amount, currency){
    let amountDisplayed;
    if(amount === 0){
        amountDisplayed = amount;
    } else {
        amountDisplayed = currency === 'XOF' ? parseInt(amount) : amount.toFixed(2);
    }

    return amountDisplayed + ' ' + currency;
}

export function buildProductBillingModelFromState(state){
    const billingModel = new billing(state.amount, state.province, state.convCurrency);
    return executeConversion(billingModel, state.rateDefinition);
}

export function buildCompanyBillingModelFromState(state) {
    const billingModel = state.billingModel;
    const companyBillingModel = new billing(billingModel.total, 'QC', state.convCurrency, false);
    const companyRowList = initCompanyFeesRows(billingModel.total, state.city, state.hasRunDrive, state.runDrive);
    companyBillingModel.updateRowList(companyRowList);

    return executeConversion(companyBillingModel, state.rateDefinition);
}