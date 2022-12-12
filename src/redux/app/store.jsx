import { configureStore } from "@reduxjs/toolkit";
import loginInfoSlice from "../features/loginInfoSlice"
import registerSlice from "../features/registerSlice"

//! CREATING
const store = configureStore({
    reducer:{
        loginInfos: loginInfoSlice,
        registerInfos: registerSlice
    }
})

export default store;