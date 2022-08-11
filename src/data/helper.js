import {taxesList} from "./taxGridFees.js";

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

export function buildConvertedAmountRow(title, amount, conversionRate = 0) {
    const amountConverted = amount * conversionRate;
    return {
        'title': title,
        'amount': amountConverted,
    };
}

export function executeConversion(billingModel, rateDefinition = 0) {
    let convertedAmountList = [];
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
                const convertedRow = buildConvertedAmountRow(row.title, row.amountWithTaxes, conversionRate);
                convertedAmountList.push(convertedRow);
            }

            const totalConverted = billingModel.total * conversionRate;
            billingModel.totalConverted = totalConvertedDisplay(totalConverted, currency);

            const convertedRow = buildConvertedAmountRow('Total ' + currency, billingModel.total, conversionRate);
            convertedAmountList.push(convertedRow);
        }
    }

    return {
        'billingModel': billingModel,
        'convertedAmountList': convertedAmountList,
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
}