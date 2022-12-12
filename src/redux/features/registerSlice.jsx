import { createSlice } from "@reduxjs/toolkit"; 

const initialStates = {
    name:"",
    email:"",
    password:""
};

const registerSlice = createSlice({
    name:"registerInfo",
    initialState: initialStates,
    reducers : {
        registerInfos: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.password = action.payload.password
        },
        afterRegister:(state) => {
            state.password = "";
        }
    }
})

export const { registerInfos, afterRegister } = registerSlice.actions;
export default registerSlice.reducer;