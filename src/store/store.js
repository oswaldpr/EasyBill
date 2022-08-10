import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/counter/counterSlice'
import billReducer from '../store/bill/billSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        bill: billReducer,
    },
})