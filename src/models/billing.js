import {singleRow} from "./singleRow.js";
import {taxesList} from "../data/taxGridFees.js";
import {productFeesDefinition} from "../data/productGridFees.js";
import {getRate} from "../data/currencyApi.js";
import {addition} from "../data/helper.js";

export class billing {
    constructor(amount, state, convCurrency = 'CAD', initRowsList = true) {
        const currency = 'CAD';
        this.amount = amount;
        this.currency = currency;
        this.convCurrency = convCurrency || currency;
        this.purchaseState = state;
        this.subtotal = 0; // total without taxes
        this.taxDetails = {}; // each taxes + total taxes
        this.total = 0; // total with taxes
        this.totalConverted = 0;
        if(initRowsList){
            this.rows = this.rowDefinitions();
            this.calculateTotal();
        }
    }

    initRows() {
        let rowList = [];
        const amount = this.amount;
        const singleProductFees = productFeesDefinition(amount, this.purchaseState);
        rowList.push({'title': 'Selling price', 'amount': amount, 'handleQST': false});
        if(amount){
            for (const [key, definition] of Object.entries(singleProductFees)) {
                rowList.push({'title': definition.title, 'amount': definition.amount, 'handleQST': true});
            }
        }
        return rowList;
    }

    rowDefinitions() {
        let rowDefinitions = []
        let rowList = this.initRows();
        rowList.forEach((row) => {
            rowDefinitions.push(new singleRow(row.amount, this.purchaseState, row.otherTax, row.title, row.handleQST));
        })
        return rowDefinitions;
    }

    updateRowList(rowList = [], amount = null){
        if(amount){
            this.amount = amount
        }
        let rowDefinitions = [];
        rowList.forEach((row) => {
            rowDefinitions.push(new singleRow(row.amount, this.purchaseState, row.otherTax, row.title, row.handleQST));
        })
        this.rows = rowDefinitions;
        this.calculateTotal();
    }

    calculateTotal() {
        let total = 0;
        let subtotal = 0;
        let taxDetails = {
            'GST': 0,
            'PST': 0,
            'HST': 0,
            'QST': 0,
            'otherTax': 0,
            'totalTax': 0
        };

        let rowDefinitions = this.rows;
        rowDefinitions.forEach((row) => {
            const taxList = taxesList(this.purchaseState);
            taxList.forEach((tax) => {
                taxDetails[tax] = addition(taxDetails[tax], row[tax]);
            });

            taxDetails.totalTax = addition(taxDetails.totalTax, row.totalTax);
            subtotal = addition(subtotal, row.amount);
            total = addition(total, row.amountWithTaxes);
        })

        this.subtotal = subtotal;
        this.taxDetails = taxDetails;
        this.total = total;

        return rowDefinitions;
    }

    async convertTotal() {
        if(this.convCurrency !== 'CAD'){
            let rows = this.rows;
            for (const row of rows) {
                row.totalConverted = await this.convertCurrency(row.amountWithTaxes);
            }
            this.totalConverted = await this.convertCurrency(this.total);
        }
        return this;
    }

    async convertCurrency() {
        let conv = 0;
        if(this.convCurrency !== 'CAD'){
            const rate = await getRate(this.convCurrency);
            conv = this.amount * rate
        }
        return conv;
    }

    getHeaderRow() {
        const provinceTaxesList = taxesList(this.purchaseState);
        let headRow = ['Type', 'Amount'];
        provinceTaxesList.forEach((tax) => {
            headRow.push(tax);
        })
        headRow.push('Total');

        if(this.convCurrency !== 'CAD'){
            headRow.push('Currency');
        }

        return headRow;
    }

    getSummaryRow(title = null) {
        let totalTitle = title || 'Total';
        const summaryRow = {
            'title' : totalTitle,
            'amount' : this.subtotal,
            'amountWithTaxes' : this.total,
        };

        if(this.convCurrency !== 'CAD'){
            summaryRow.totalConverted = this.totalConverted;
        }

        const provinceTaxesList = taxesList(this.purchaseState);
        provinceTaxesList.forEach((tax) => {
            summaryRow[tax] = this.taxDetails[tax];
        })
        // summaryRow.amountWithTaxes = this.total;
        return summaryRow;
    }
}