function initProductGridFees() {
    let grid = [];
    grid.push({'min': 1, 'max': 49.99, 'purchaseFees': 35, 'exitFees': 0, 'auctionNowFees': 0});
    grid.push({'min': 50, 'max': 99.99, 'purchaseFees': 50, 'exitFees': 30, 'auctionNowFees': 25});
    grid.push({'min': 100, 'max': 199.99, 'purchaseFees': 70, 'exitFees': 35, 'auctionNowFees': 55});
    grid.push({'min': 200, 'max': 299.99, 'purchaseFees': 90, 'exitFees': 35, 'auctionNowFees': 55});
    grid.push({'min': 300, 'max': 399.99, 'purchaseFees': 120, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 400, 'max': 499.99, 'purchaseFees': 135, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 500, 'max': 599.99, 'purchaseFees': 145, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 600, 'max': 699.99, 'purchaseFees': 180, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 700, 'max': 799.99, 'purchaseFees': 195, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 800, 'max': 999.99, 'purchaseFees': 205, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 1000, 'max': 1199.99, 'purchaseFees': 240, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 1200, 'max': 1399.99, 'purchaseFees': 245, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 1400, 'max': 1499.99, 'purchaseFees': 260, 'exitFees': 35, 'auctionNowFees': 65});
    grid.push({'min': 1500, 'max': 1599.99, 'purchaseFees': 300, 'exitFees': 35, 'auctionNowFees': 75});
    grid.push({'min': 1600, 'max': 1699.99, 'purchaseFees': 320, 'exitFees': 35, 'auctionNowFees': 75});
    grid.push({'min': 1700, 'max': 1799.99, 'purchaseFees': 340, 'exitFees': 35, 'auctionNowFees': 75});
    grid.push({'min': 1800, 'max': 1999.99, 'purchaseFees': 350, 'exitFees': 35, 'auctionNowFees': 75});
    grid.push({'min': 2000, 'max': 2499.99, 'purchaseFees': 365, 'exitFees': 45, 'auctionNowFees': 75});
    grid.push({'min': 2500, 'max': 2999.99, 'purchaseFees': 415, 'exitFees': 45, 'auctionNowFees': 75});
    grid.push({'min': 3000, 'max': 3499.99, 'purchaseFees': 445, 'exitFees': 45, 'auctionNowFees': 75});
    grid.push({'min': 3500, 'max': 3999.99, 'purchaseFees': 470, 'exitFees': 45, 'auctionNowFees': 75});
    grid.push({'min': 4000, 'max': 4999.99, 'purchaseFees': 495, 'exitFees': 55, 'auctionNowFees': 75});
    grid.push({'min': 5000, 'max': 5999.99, 'purchaseFees': 520, 'exitFees': 55, 'auctionNowFees': 75});
    grid.push({'min': 6000, 'max': 7499.99, 'purchaseFees': 535, 'exitFees': 55, 'auctionNowFees': 75});
    grid.push({'min': 7500, 'max': 9999.99, 'purchaseFees': 560, 'exitFees': 55, 'auctionNowFees': 99});
    grid.push({'min': 10000, 'max': 14999.99, 'purchaseFees': 610, 'exitFees': 55, 'auctionNowFees': 99});
    grid.push({'min': 15000, 'max': 19999.99, 'purchaseFees': 660, 'exitFees': 55, 'auctionNowFees': 99});
    grid.push({'min': 20000, 'max': 24999.99, 'purchaseFees': 700, 'exitFees': 55, 'auctionNowFees': 99});
    grid.push({'min': 25000, 'max': 29999.99, 'purchaseFees': 805, 'exitFees': 55, 'auctionNowFees': 99});
    grid.push({'min': 30000, 'max': 99999.99, 'purchaseFees': 830, 'exitFees': 55, 'auctionNowFees': 99});

    return grid;
}

export function productFeesDefinition(productAmount, state) {
    let productFees = {
        purchaseFees: {'title': 'Purchase fee', 'amount': 0},
        exitFees: {'title': 'Exit fee', 'amount': 0},
        auctionNowFees: {'title': 'AuctionNow fee', 'amount': 0},
    };

    if(state === 'QC'){
        productFees.vehicleTransferFees = {'title': 'Non dealer vehicle transfer fee for QC', 'amount': 50}; //Fixed amount
        productFees.environmentalFees = {'title': 'Environmental fee', 'amount': 10}; //Fixed amount
    }

    if(state === 'ON'){
        productFees.nonDealerFees = {'title': 'Non-Dealer fee Non-Branded Carproof fee', 'amount': 50}; //Fixed amount
        productFees.vehicleTransferFees = {'title': 'Non dealer vehicle transfer fee for ON' , 'amount': 75}; //Fixed amount
        // productFees.onlineFees = {'title': 'Online fee', 'amount': 75}; //Fixed amount
    }

    let productGridFees = initProductGridFees();
    productGridFees.forEach((interval) => {
        if(interval.min <= productAmount && productAmount <= interval.max){
            productFees.purchaseFees.amount = interval.purchaseFees;
            productFees.exitFees.amount = interval.exitFees;
            productFees.auctionNowFees.amount = interval.auctionNowFees;
        }
    });

    return productFees;
}