import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    posts:[]
}

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: initialStates,
    reducers: {
        getPosts:(state,action) => {
            state.posts = action.payload.posts
        }
    }
})

export const { getPosts } = postsSlice.actions;
export default postsSlice.reducer;