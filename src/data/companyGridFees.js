export function companyFeesDefinition(city = 'Montreal', runDrive = false) {
    let towingFeeAmount = 95;
    switch (city) {
        case 'Montreal':
            towingFeeAmount = 95;
            break;
        case 'Quebec':
            towingFeeAmount = 250;
            break;
        case 'Ottawa':
            towingFeeAmount = 250;
            break;
        case 'Toronto':
            towingFeeAmount = 400;
            break;
        case 'London':
            towingFeeAmount = 500;
            break;
    }

    return {
        serviceFees: {'title': 'Service fee', 'amount': 200},
        runDriveFee: runDrive ? {'title': 'No run No drive', 'amount': 100} : {'title': 'Run and drive', 'amount': 50},
        towingFee: {'title': 'Towing fee from ' + city, 'amount': towingFeeAmount}
    };
}

export function initCompanyFeesRows(city, runDrive) {
    let rowList = [];
    const singleFee = companyFeesDefinition(city, runDrive);
    for (const [key, definition] of Object.entries(singleFee)) {
        rowList.push({'title': definition.title, 'amount': definition.amount, 'handleQST': true});
    }
    return rowList;
}