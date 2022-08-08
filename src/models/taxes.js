
export class taxes {
    constructor(amount, state, customTax = null) {
        this.amount = amount;
        this.customTax = customTax;
    }
}