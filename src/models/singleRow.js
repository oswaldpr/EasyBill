import {taxesList, taxGridFees} from "../data/taxGridFees.js";

export class singleRow{
    constructor(amount, state, otherTax = null, title = '') {
        this.title = title;
        this.amount = amount;
        this.GST = 0;
        this.PST = 0;
        this.HST = 0;
        this.QST = 0;
        this.otherTax = 0;
        this.totalTax = 0;
        this.amountWithTaxes = 0;

        if(otherTax || otherTax === 0){
            this.otherTax = this.calculateSingleTax(this.amount, otherTax);
        } else {
            this.initTaxes(this.amount, state);
        }

        const taxList = taxesList();
        taxList.forEach((tax) => {
            this.totalTax = this.totalTax + this[tax];
        });

        // this.totalTax = this.GST + this.PST + this.HST + this.QST + this.otherTax;
        this.amountWithTaxes = this.amount + this.totalTax;
    }

    initTaxes(amount, state){
        const taxGrid = taxGridFees();
        const currentTaxes = taxGrid[state];
        for (const [taxName, tax] of Object.entries(currentTaxes['tax'])) {
            this[taxName] = this.calculateSingleTax(amount, tax)
        }
    }

    calculateSingleTax(amount, tax){
        return amount * tax / 100;
    }
}