import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    loginInformation: false,
    email: "",
    password:"",
    userInfo:""
}

const loginInfoSlice = createSlice({
    name:"loginInfo",
    initialState: initialStates,
    reducers : {
        loginInfos: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password
        },
        loginSuccess: (state, action) => {
            state.loginInformation = true;
            state.userInfo = action.payload.userInfo
            state.email = action.payload.email
            delete state.password
        },
        logout: () => initialStates
    }
})

export const { loginInfos, loginSuccess, logout } = loginInfoSlice.actions
export default loginInfoSlice.reducer