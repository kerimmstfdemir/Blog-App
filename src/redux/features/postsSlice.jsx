import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    posts:[],
    user:{
        likedPosts:[]
    },
}

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: initialStates,
    reducers: {
        getPosts:(state,action) => {
            state.posts = action.payload.posts
        },
        getUser:(state, action) => {
            state.user = action.payload.user
        },
        updateFavorites:(state, action) => {
            state.user.likedPosts = action.payload.likedPosts
        },
        logoutCase: () => initialStates
    }
})

export const { getPosts, getUser, updateFavorites, logoutCase } = postsSlice.actions;
export default postsSlice.reducer;