import {singleRow} from "./singleRow.js";
import {taxesList} from "../data/taxGridFees.js";
import {productFees} from "../data/gridFees.js";

export class billing {
    constructor(amount, state, convCurrency = null) {
        const homeCurrency = 'CAD';
        this.amount = amount;
        this.homeCurrency = homeCurrency;
        this.convCurrency = convCurrency || homeCurrency;
        this.state = state;
        this.rows = this.rowDefinitions();
        this.subtotal = 0; // total without taxes
        this.taxDetails = {'GST': 0, 'PST': 0, 'HST': 0, 'QST': 0, 'customTax': 0,  'totalTax': 0 }; // each taxes + total taxes
        this.total = 0; // total with taxes
        this.totalConverted = 0;
        this.calculateTotal();
    }

    initRows() {
        let rowList = [];
        const amount = this.amount;
        const singleProductFees = productFees(amount);
        rowList.push({'amount': amount});
        if(amount){
            rowList.push({'amount': singleProductFees, 'customTax': 0, 'title': 'Product base fees'});
            rowList.push({'amount': 250, 'title': 'Remorqueur'});
        }
        return rowList;
    }

    rowDefinitions() {
        let rowDefinitions = []
        let rowList = this.initRows();
        rowList.forEach((row) => {
            rowDefinitions.push(new singleRow(row.amount, this.state, row.customTax, row.title));
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