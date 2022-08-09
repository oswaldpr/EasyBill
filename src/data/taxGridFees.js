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

    tax.QC = {'code': 'QC', 'name': 'Quebec', 'tax': quebec};
    tax.ON = {'code': 'ON', 'name': 'Ontario', 'tax': ontario};
    tax.AB = {'code': 'AB', 'name': 'Alberta', 'tax': alberta};
    tax.BC = {'code': 'BC', 'name': 'British Columbia', 'tax': british_columbia};
    tax.MB = {'code': 'MB', 'name': 'Manitoba', 'tax': manitoba};
    tax.NB = {'code': 'NB', 'name': 'New Brunswick', 'tax': new_brunswick};
    tax.NL = {'code': 'NL', 'name': 'Newfoundland and Labrador', 'tax': newfoundland_and_labrador};
    tax.NT = {'code': 'NT', 'name': 'Northwest Territories', 'tax': northwest_territories};
    tax.NS = {'code': 'NS', 'name': 'Nova Scotia', 'tax': nova_scotia};
    tax.NU = {'code': 'NU', 'name': 'Nunavut', 'tax': nunavut};
    tax.PE = {'code': 'PE', 'name': 'Prince Edward Island', 'tax': prince_edward_island};
    tax.SK = {'code': 'SK', 'name': 'Saskatchewan', 'tax': saskatchewan};
    tax.YT = {'code': 'YT', 'name': 'Yukon', 'tax': yukon};

    return state ? tax[state] : tax;
}

export function taxesList(state = null){
    let list = [];
    if(state){
        const grid = taxGridFees(state)
        const tax = grid.tax;
        for (const [key, value] of Object.entries(tax)) {
            list.push(key);
        }
    } else {
        list = ['GST', 'PST', 'HST', 'QST'];
    }

    return list;
}

export function provinceDefinition(){
    let provinceDefinition = {};
    provinceDefinition.QC = {'code': 'QC', 'fr': 'Quebec', 'en': 'Quebec'};
    provinceDefinition.ON = {'code': 'ON', 'fr': 'Ontario', 'en': 'Ontario'};

    provinceDefinition.AB = {'code': 'AB', 'fr': 'Alberta', 'en': 'Alberta'};
    provinceDefinition.BC = {'code': 'BC', 'fr': 'British Columbia', 'en': 'British Columbia'};
    provinceDefinition.MB = {'code': 'MB', 'fr': 'Manitoba', 'en': 'Manitoba'};
    provinceDefinition.NB = {'code': 'NB', 'fr': 'New Brunswick', 'en': 'New Brunswick'};
    provinceDefinition.NL = {'code': 'NL', 'fr': 'Newfoundland and Labrador', 'en': 'Newfoundland and Labrador'};
    provinceDefinition.NT = {'code': 'NT', 'fr': 'Northwest Territories', 'en': 'Northwest Territories'};
    provinceDefinition.NS = {'code': 'NS', 'fr': 'Nova Scotia', 'en': 'Nova Scotia'};
    provinceDefinition.NU = {'code': 'NU', 'fr': 'Nunavut', 'en': 'Nunavut'};
    provinceDefinition.PE = {'code': 'PE', 'fr': 'Prince Edward Island', 'en': 'Prince Edward Island'};
    provinceDefinition.SK = {'code': 'SK', 'fr': 'Saskatchewan', 'en': 'Saskatchewan'};
    provinceDefinition.YT = {'code': 'YT', 'fr': 'Yukon', 'en': 'Yukon'};
    return provinceDefinition;
}

export function getProvinceList(lang = 'fr'){
    let provinceList = [];
    let provinceDefinitionList = provinceDefinition();
    for (const [key, definition] of Object.entries(provinceDefinitionList)) {
        provinceList.push({'key': definition['code'], 'value': definition[lang]});
    }

    return provinceList;
}

export function provinceOptions(lang){
    const provinceList = getProvinceList(lang);
    let options = '';
    provinceList.forEach((province) => {
        options = options + '<option value="' + province.key + '">' + province.value + '</option>';
    });

    return options;
}