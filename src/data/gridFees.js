function initProductGridFees() {
    let grid = [];
    grid.push({'min': 1, 'max': 1000, 'fees': 100});
    grid.push({'min': 1001, 'max': 2000, 'fees': 200});
    grid.push({'min': 2001, 'max': 3000, 'fees': 300});
    grid.push({'min': 3001, 'max': 4000, 'fees': 400});
    grid.push({'min': 4001, 'max': 5000, 'fees': 500});
    return grid;
}

export function productFees(productAmount) {
    let productFees = 0;
    let productGridFees = initProductGridFees();
    productGridFees.forEach((interval) => {
        if(interval.min <= productAmount && productAmount <= interval.max){
            productFees = interval.fees;
        }
    });

    return productFees;
}