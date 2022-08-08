import {taxesList, taxGridFees} from "../data/gridFees.js";

export class singleRow{
    constructor(amount, state, customTax = null) {
        this.amount = amount;
        this.customTax = 0;
        this.GST = 0;
        this.PST = 0;
        this.HST = 0;
        this.QST = 0;

        if(customTax){
            this.customTax = this.calculateSingleTax(this.amount, customTax);
        } else {
            this.initTaxes(this.amount, state);
        }

        const taxList = taxesList();
        taxList.forEach((tax) => {
            this.totalTax = this.totalTax + this[tax];
        });

        // this.totalTax = this.GST + this.PST + this.HST + this.QST + this.customTax;
        this.amountWithTaxes = this.amount + this.totalTax;
    }

    initTaxes(amount, state){
        const taxGrid = taxGridFees();
        const currentTaxes = taxGrid[state];
        for (const [taxName, tax] of Object.entries(currentTaxes['tax'])) {
            this[taxName] = this.calculateSingleTax(amount, tax)
        }
        debugger
    }

    calculateSingleTax(amount, tax){
        return  amount * tax / 100;
    }
}