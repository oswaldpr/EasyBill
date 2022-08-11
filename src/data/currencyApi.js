import axios from "axios";

export function getCurrencyList (){
    // return ['CAD', 'XOF', 'EUR', 'USD', 'GBP', 'CNY', 'NGN', 'GHS']
    return ['CAD', 'XOF', 'EUR', 'USD', 'NGN']
}

export async function buildCurrentConversionRateList(){
    const list = getCurrencyList();
    return list.map(async (currency) => {
        return await getRate(currency);
    })
}

export function getRate(convCurrency){
    const options = {
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/exchange',
        params: {from: 'CAD', to: convCurrency, q: 1},
        headers: {
            'X-RapidAPI-Key': 'b6cb7b3bc9msh1bfa50fface695cp11cd87jsnd7e3af5de1af',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };

    return axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export function getRateDefinition(currency){
    const options = {
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/exchange',
        params: {from: 'CAD', to: currency, q: 1},
        headers: {
            'X-RapidAPI-Key': 'b6cb7b3bc9msh1bfa50fface695cp11cd87jsnd7e3af5de1af',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };

    return axios.request(options).then(function (response) {
        return {'currency': currency, 'rate': response.data};
    }).catch(function (error) {
        console.error(error);
    });
}