import {taxesList, taxGridFees} from "../data/taxGridFees.js";

export class singleRow{
    constructor(amount, state, otherTax = null, title = '', handleQST = true) {
        this.title = title;
        this.state = state;
        this.amount = amount;
        this.currency = 'CAD';
        this.convCurrency = 'CAD';
        this.GST = 0;
        this.PST = 0;
        this.HST = 0;
        this.QST = 0;
        this.otherTax = 0;
        this.totalTax = 0;
        this.amountWithTaxes = 0;
        this.totalConverted = 0;

        if(otherTax || otherTax === 0){
            this.otherTax = this.calculateSingleTax(this.amount, otherTax);
        } else {
            this.initTaxes(this.amount, handleQST);
        }

        const taxList = taxesList(this.state);
        taxList.forEach((tax) => {
            this.totalTax = this.totalTax + this[tax];
        });

        // this.totalTax = this.GST + this.PST + this.HST + this.QST + this.otherTax;
        this.amountWithTaxes = this.amount + this.totalTax;
    }

    initTaxes(amount, handleQST = true){
        const taxGrid = taxGridFees();
        const currentTaxes = taxGrid[this.state];
        for (const [taxName, tax] of Object.entries(currentTaxes['tax'])) {
            if(taxName === 'QST'){
                this.QST = handleQST ? this.calculateSingleTax(amount, tax) : 0;
            } else {
                this[taxName] = this.calculateSingleTax(amount, tax);
            }
        }
    }

    calculateSingleTax(amount, tax){
        return amount * tax / 100;
    }
}