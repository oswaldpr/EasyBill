import {createSlice} from '@reduxjs/toolkit';
import {billing} from "../../models/billing.js";
import {buildCompanyBillingModelFromState, buildProductBillingModelFromState,} from "../../data/helper.js";


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
        showCompanyBillSection: false,
        runDrive: false,
        bidAmount: null,
        province: 'QC',
        city: 'Montreal',
        convCurrency: 'CAD',
        conversionRate: 0,
        rateDefinition: {'CAD': 1},
        billingModel : null,
        companyBillingModel : null,
        convertedAmountList: [],
    },
    reducers: {
        updateDefinitionRate: (state, rateDefinition) => {
            const {currency, rate} = rateDefinition.payload
            state.rateDefinition[currency] = rate;
        },
        updateAmount: (state, amount) => {
            state.amount = parseFloat(amount.payload);
            state.billingModel = buildProductBillingModelFromState(state);
            state.companyBillingModel = buildCompanyBillingModelFromState(state);
        },
        updateShowBidSection: (state, checked) => {
            state.showBidSection = checked.payload;
        },
        updateShowCompanyBillSection: (state, checked) => {
            state.showCompanyBillSection = checked.payload;
        },
        updateBidAmount: (state, bidAmount) => {
            state.bidAmount = parseFloat(bidAmount.payload);
        },
        executeBidAction: (state, data) => {
            if(state.bidAmount){
                const type = data.payload;
                state.amount = type === 'add' ? state.amount + state.bidAmount : state.amount - state.bidAmount;
                state.billingModel = buildProductBillingModelFromState(state);
                state.companyBillingModel = buildCompanyBillingModelFromState(state);
            }
        },
        updateProvince: (state, province) => {
            state.province = province.payload;
            state.billingModel = buildProductBillingModelFromState(state);
            state.companyBillingModel = buildCompanyBillingModelFromState(state);
        },
        updateCurrency: (state, convCurrency) => {
            state.convCurrency = convCurrency.payload;
            state.billingModel = buildProductBillingModelFromState(state);
            state.companyBillingModel = buildCompanyBillingModelFromState(state);
        },
        updateBill: (state) => {
            state.billingModel = buildProductBillingModelFromState(state);
            state.companyBillingModel = buildCompanyBillingModelFromState(state);
        },
        reset: (state) => {
            state.amount = 0;
            state.bidAmount = null;
            state.billingModel = new billing(state.amount, state.province, state.convCurrency);
            state.convertedAmountList = [];
        },
        updateCity: (state, city) => {
            state.city = city.payload;
            state.companyBillingModel = buildCompanyBillingModelFromState(state);
        },
        updateRunDrive: (state, runDrive) => {
            state.runDrive = runDrive.payload;
            state.companyBillingModel = buildCompanyBillingModelFromState(state);
        },
        updateCompanyBill: (state) => {
            state.companyBillingModel = buildCompanyBillingModelFromState(state);
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
export const { updateAmount, updateProvince, updateCurrency, updateBidAmount,
    executeBidAction, reset, updateShowBidSection, updateDefinitionRate,
    updateShowCompanyBillSection, updateCity, updateRunDrive } = billSlice.actions

export default billSlice.reducer