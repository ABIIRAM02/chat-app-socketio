'use client'

import { configureStore } from "@reduxjs/toolkit"
import counterReducer from './Features/counter/CounterSlice'

export const store = configureStore({
    reducer:{
        counter: counterReducer
    }
})

