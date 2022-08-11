import {createSlice} from '@reduxjs/toolkit';
import {billing} from "../../models/billing.js";
import {executeConversion} from "../../data/helper.js";


// export let fetchCurrencyRate = createAsyncThunk(
//     'bill/fetchCurrencyRate',
//     async (currency) => {
//         debugger
//         return {
//             'currency': currency,
//             'rate': await getRate(currency),
//         };
//     }
// )

export const billSlice = createSlice({
    name: 'bill',
    initialState: {
        lang: 'fr',
        amount: 0,
        showBidSection: false,
        bidAmount: null,
        province: 'QC',
        convCurrency: 'CAD',
        conversionRate: 0,
        rateDefinition: {'CAD': 1},
        billingModel : null,
        convertedAmountList: [],
    },
    reducers: {
        updateDefinitionRate: (state, rateDefinition) => {
            const {currency, rate} = rateDefinition.payload
            state.rateDefinition[currency] = rate;
        },
        updateAmount: (state, amount) => {
            state.amount = parseFloat(amount.payload);

            const billingModel = new billing(state.amount, state.province, state.convCurrency);
            const conversion = executeConversion(billingModel, state.rateDefinition);
            state.billingModel = conversion.billingModel;
            state.convertedAmountList = conversion.convertedAmountList;
        },
        updateShowBidSection: (state, checked) => {
            state.showBidSection = checked.payload;
        },
        updateBidAmount: (state, bidAmount) => {
            state.bidAmount = parseFloat(bidAmount.payload);
        },
        executeBidAction: (state, data) => {
            if(state.bidAmount){
                const type = data.payload;
                state.amount = type === 'add' ? state.amount + state.bidAmount : state.amount - state.bidAmount;

                const billingModel = new billing(state.amount, state.province, state.convCurrency);
                const conversion = executeConversion(billingModel, state.rateDefinition);
                state.billingModel = conversion.billingModel;
                state.convertedAmountList = conversion.convertedAmountList;
            }
        },
        updateProvince: (state, province) => {
            state.province = province.payload;

            const billingModel = new billing(state.amount, state.province, state.convCurrency);
            const conversion = executeConversion(billingModel, state.rateDefinition);
            state.billingModel = conversion.billingModel;
            state.convertedAmountList = conversion.convertedAmountList;
        },
        updateCurrency: (state, convCurrency) => {
            state.convCurrency = convCurrency.payload;

            const billingModel = new billing(state.amount, state.province, state.convCurrency);
            const conversion = executeConversion(billingModel, state.rateDefinition);
            state.billingModel = conversion.billingModel;
            state.convertedAmountList = conversion.convertedAmountList;
        },
        updateBill: (state) => {
            const conversion = executeConversion(state.billingModel, state.rateDefinition);
            state.billingModel = conversion.billingModel;
            state.convertedAmountList = conversion.convertedAmountList;
        },
        reset: (state) => {
            state.amount = 0;
            state.bidAmount = null;
            state.billingModel = new billing(state.amount, state.province, state.convCurrency);
            state.convertedAmountList = [];
        },
    },
    // extraReducers: {
    //     [fetchCurrencyRate.fulfilled]: (state, action) => {
    //         debugger
    //         const {currency, rate} = action.payload;
    //         state.rateDefinition[currency] = rate;
    //     },
    // },
    // extraReducers: (builder) => {
    //     // Add reducers for additional action types here, and handle loading state as needed
    //     builder.addCase(fetchCurrencyRate.fulfilled, (state, action) => {
    //         // Add user to the state array
    //         debugger
    //         state.name;
    //         state.rateDefinition.push(action.payload);
    //     })
    // },
})

// Action creators are generated for each case reducer function
export const { updateAmount, updateProvince, updateCurrency, updateBidAmount, executeBidAction, reset, updateShowBidSection, updateDefinitionRate } = billSlice.actions

export default billSlice.reducer