import {singleRow} from "./singleRow.js";
import {taxesList} from "../data/gridFees.js";

export class billing {
    constructor(amount, state) {
        const homeCurrency = 'CAD';
        this.amount = amount;
        this.homeCurrency = homeCurrency;
        this.convCurrency = homeCurrency;
        this.state = state;
        this.rows = this.rowDefinitions();
        this.subtotal = 0; // total without taxes
        this.taxDetails = {'GST': 0, 'PST': 0, 'HST': 0, 'customTax': 0,  'totalTax': 0 }; // each taxes + total taxes
        this.total = 0; // total with taxes
        this.totalConverted = 0;

        this .calculateTotal();
    }

    initRows() {
        let rowList = [];
        rowList.push({'amount': 10, 'customTax': null});
        rowList.push({'amount': 10, 'customTax': 2});
        return rowList;
    }

    rowDefinitions() {
        let rowDefinitions = []
        let rowList = this.initRows();
        rowList.forEach((row) => {
            rowDefinitions.push(new singleRow(row.amount, this.state, row.customTax));
        })
        return rowDefinitions;
    }

    calculateTotal() {
        let total = 0;
        let subtotal = 0;
        let taxDetails = {
            'GST': 0,
            'PST': 0,
            'HST': 0,
            'QST': 0,
            'customTax': 0,
            'totalTax': 0
        };

        let rowDefinitions = this.rows;
        rowDefinitions.forEach((row) => {
            const taxList = taxesList();
            taxList.forEach((tax) => {
                taxDetails[tax] = taxDetails[tax] + row[tax];
            });
            // taxDetails.GST = taxDetails.GST + row.GST;
            // taxDetails.PST = taxDetails.PST + row.PST;
            // taxDetails.HST = taxDetails.HST + row.HST;
            // taxDetails.customTax = taxDetails.customTax + row.customTax;
debugger
            taxDetails.totalTax = taxDetails.totalTax + row.totalTax;
            subtotal = subtotal + row.amount;
            total = total + row.amountWithTaxes;
        })

        this.subtotal = subtotal;
        this.taxDetails = taxDetails;
        this.total = total;

        return rowDefinitions;
    }
}