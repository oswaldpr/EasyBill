import { createSlice } from '@reduxjs/toolkit'
import {billing} from "../../models/billing.js";
import {getRate} from "../../data/currencyApi.js";
import {buildConvertedAmountList} from "../../data/helper.js";

export const billSlice = createSlice({
    name: 'bill',
    initialState: {
        lang: 'fr',
        amount: 0,
        province: 'QC',
        convCurrency: 'CAD',
        conversionRate: 0,
        billingModel : JSON.stringify(new billing(0, 'QC', 'CAD')),
        convertedAmountList: [],
    },
    reducers: {
        updateAmount: (state, amount) => {
            state.amount = parseFloat(amount.payload);
            state.billingModel = JSON.stringify(new billing(state.amount, state.province, state.convCurrency));
            state.convertedAmountList = buildConvertedAmountList(state.billingModel, state.conversionRate);
        },
        updateProvince: (state, province) => {
            state.province = province.payload;
            state.billingModel = JSON.stringify(new billing(state.amount, state.province, state.convCurrency));
            state.convertedAmountList = buildConvertedAmountList(state.billingModel, state.conversionRate);
        },
        updateCurrency: async (state, convCurrency) => {
            state.convCurrency = convCurrency.payload;
            if(state.convCurrency === 'CAD'){
                state.conversionRate = (await getRate(state.convCurrency).then((rate) =>{
                    state.convertedAmountList = buildConvertedAmountList(state.billingModel, rate);
                    return rate;
                }))
            }
        },
        convertCurrency: async (state, currency) => {
            state.convertedAmountList = buildConvertedAmountList(state.billingModel, state.conversionRate);
        },
        updateBill: (state) => {
            state.billingModel = JSON.stringify(new billing(state.amount, state.province, state.convCurrency));
            state.convertedAmountList = buildConvertedAmountList(state.billingModel, state.conversionRate);
        },
        reset: (state) => {
            debugger
            state.amount = 0;
            state.billingModel = JSON.stringify(new billing(state.amount, state.province, state.convCurrency));
            state.convertedAmountList = [];
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateAmount, updateProvince, updateCurrency, convertCurrency, reset } = billSlice.actions

export default billSlice.reducer