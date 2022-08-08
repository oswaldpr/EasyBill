export function productGridFees() {
    let grid = [];
    grid['1000'] = 100;
    grid['2000'] = 200;
    grid['3000'] = 300;
    grid['4000'] = 400;
    grid['5000'] = 500;
    return grid;
}

export function taxGridFees(state = null) {
    const alberta = {
        'GST': 5,
    };
    const british_columbia = {
        'GST': 5,
        'PST': 7,
    };
    const manitoba = {
        'GST': 5,
        'PST': 7,
    };
    const new_brunswick = {
        'HST': 15,
    };
    const newfoundland_and_labrador = {
        'HST': 15,
    };
    const northwest_territories = {
        'GST': 5,
    };
    const nova_scotia = {
        'HST': 15,
    };
    const nunavut = {
        'GST': 5,
    };
    const ontario = {
        'HST': 13,
    };
    const prince_edward_island = {
        'HST': 15,
    };
    const quebec = {
        'GST': 5,
        'QST': 9.975,
    };
    const saskatchewan = {
        'GST': 5,
        'PST': 6,
    };
    const yukon = {
        'GST': 5,
    };

    let tax = {};
    tax.AB = {'code': 'AB', 'name': 'Alberta', 'tax': alberta};
    tax.BC = {'code': 'BC', 'name': 'British Columbia', 'tax': british_columbia};
    tax.MB = {'code': 'MB', 'name': 'Manitoba', 'tax': manitoba};
    tax.NB = {'code': 'NB', 'name': 'New Brunswick', 'tax': new_brunswick};
    tax.NL = {'code': 'NL', 'name': 'Newfoundland and Labrador', 'tax': newfoundland_and_labrador};
    tax.NT = {'code': 'NT', 'name': 'Northwest Territories', 'tax': northwest_territories};
    tax.NS = {'code': 'NS', 'name': 'Nova Scotia', 'tax': nova_scotia};
    tax.NU = {'code': 'NU', 'name': 'Nunavut', 'tax': nunavut};
    tax.ON = {'code': 'ON', 'name': 'Ontario', 'tax': ontario};
    tax.PE = {'code': 'PE', 'name': 'Prince Edward Island', 'tax': prince_edward_island};
    tax.QC = {'code': 'QC', 'name': 'Quebec', 'tax': quebec};
    tax.SK = {'code': 'SK', 'name': 'Saskatchewan', 'tax': saskatchewan};
    tax.YT = {'code': 'YT', 'name': 'Yukon', 'tax': yukon};

    return state ? tax[state] : tax;
}

export function taxesList(){
    return ['GST', 'PST', 'HST', 'QST', 'customTax'];
}