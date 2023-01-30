import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/counter/counterSlice'
import billReducer from './bill/billSlice.js'
import thunkMiddleware from "redux-thunk";

export default configureStore({
    reducer: {
        // counter: counterReducer,
        bill: billReducer,
    },
    middleware: [thunkMiddleware],
})