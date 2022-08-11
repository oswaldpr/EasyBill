function initProductGridFees() {
    let grid = [];
    grid.push({'min': 1, 'max': 49.99, 'purchaseFee': 35, 'exitFee': 0, 'auctionNowFee': 0});
    grid.push({'min': 50, 'max': 99.99, 'purchaseFee': 50, 'exitFee': 30, 'auctionNowFee': 25});
    grid.push({'min': 100, 'max': 199.99, 'purchaseFee': 70, 'exitFee': 35, 'auctionNowFee': 55});
    grid.push({'min': 200, 'max': 299.99, 'purchaseFee': 90, 'exitFee': 35, 'auctionNowFee': 55});
    grid.push({'min': 300, 'max': 399.99, 'purchaseFee': 120, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 400, 'max': 499.99, 'purchaseFee': 135, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 500, 'max': 599.99, 'purchaseFee': 145, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 600, 'max': 699.99, 'purchaseFee': 180, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 700, 'max': 799.99, 'purchaseFee': 195, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 800, 'max': 999.99, 'purchaseFee': 205, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 1000, 'max': 1199.99, 'purchaseFee': 240, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 1200, 'max': 1399.99, 'purchaseFee': 245, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 1400, 'max': 1499.99, 'purchaseFee': 260, 'exitFee': 35, 'auctionNowFee': 65});
    grid.push({'min': 1500, 'max': 1599.99, 'purchaseFee': 300, 'exitFee': 35, 'auctionNowFee': 75});
    grid.push({'min': 1600, 'max': 1699.99, 'purchaseFee': 320, 'exitFee': 35, 'auctionNowFee': 75});
    grid.push({'min': 1700, 'max': 1799.99, 'purchaseFee': 340, 'exitFee': 35, 'auctionNowFee': 75});
    grid.push({'min': 1800, 'max': 1999.99, 'purchaseFee': 350, 'exitFee': 35, 'auctionNowFee': 75});
    grid.push({'min': 2000, 'max': 2499.99, 'purchaseFee': 365, 'exitFee': 45, 'auctionNowFee': 75});
    grid.push({'min': 2500, 'max': 2999.99, 'purchaseFee': 415, 'exitFee': 45, 'auctionNowFee': 75});
    grid.push({'min': 3000, 'max': 3499.99, 'purchaseFee': 445, 'exitFee': 45, 'auctionNowFee': 75});
    grid.push({'min': 3500, 'max': 3999.99, 'purchaseFee': 470, 'exitFee': 45, 'auctionNowFee': 75});
    grid.push({'min': 4000, 'max': 4999.99, 'purchaseFee': 495, 'exitFee': 55, 'auctionNowFee': 75});
    grid.push({'min': 5000, 'max': 5999.99, 'purchaseFee': 520, 'exitFee': 55, 'auctionNowFee': 75});
    grid.push({'min': 6000, 'max': 7499.99, 'purchaseFee': 535, 'exitFee': 55, 'auctionNowFee': 75});
    grid.push({'min': 7500, 'max': 9999.99, 'purchaseFee': 560, 'exitFee': 55, 'auctionNowFee': 99});
    grid.push({'min': 10000, 'max': 14999.99, 'purchaseFee': 610, 'exitFee': 55, 'auctionNowFee': 99});
    grid.push({'min': 15000, 'max': 19999.99, 'purchaseFee': 660, 'exitFee': 55, 'auctionNowFee': 99});
    grid.push({'min': 20000, 'max': 24999.99, 'purchaseFee': 700, 'exitFee': 55, 'auctionNowFee': 99});
    grid.push({'min': 25000, 'max': 29999.99, 'purchaseFee': 805, 'exitFee': 55, 'auctionNowFee': 99});
    grid.push({'min': 30000, 'max': 99999.99, 'purchaseFee': 830, 'exitFee': 55, 'auctionNowFee': 99});

    return grid;
}

export function productFeesDefinition(productAmount, state) {
    let productFees = {
        purchaseFee: {'title': 'Purchase fee', 'amount': 0},
        exitFee: {'title': 'Exit fee', 'amount': 0},
        auctionNowFee: {'title': 'AuctionNow fee', 'amount': 0},
        environmentalFee: {'title': 'Environmental fee', 'amount': 10}, //Fixed amount
    };

    if(state === 'QC'){
        productFees.vehicleTransferFee = {'title': 'Non dealer vehicle transfer fee for QC', 'amount': 50}; //Fixed amount
    }

    if(state === 'ON'){
        productFees.nonDealerFee = {'title': 'Non-Dealer fee Non-Branded Car proof fee', 'amount': 50}; //Fixed amount
        productFees.vehicleTransferFee = {'title': 'Non dealer vehicle transfer fee for ON' , 'amount': 75}; //Fixed amount
        // productFee.onlineFee = {'title': 'Online fee', 'amount': 75}; //Fixed amount
    }

    let productGridFees = initProductGridFees();
    productGridFees.forEach((interval) => {
        if(interval.min <= productAmount && productAmount <= interval.max){
            productFees.purchaseFee.amount = interval.purchaseFee;
            productFees.exitFee.amount = interval.exitFee;
            productFees.auctionNowFee.amount = interval.auctionNowFee;
        }
    });

    return productFees;
}

export function initProductFeeRows(amount, state) {
    let rowList = [];
    const singleProductFee = productFeesDefinition(amount, state);
    rowList.push({'title': 'Selling price', 'amount': amount, 'handleQST': false});
    if(amount){
        for (const [key, definition] of Object.entries(singleProductFee)) {
            rowList.push({'title': definition.title, 'amount': definition.amount, 'handleQST': true});
        }
    }
    return rowList;
}