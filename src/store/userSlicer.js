import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode"
import axios from "../api/api"

const token = localStorage.getItem("auth") || null;
const decodeToken = token ? jwt_decode(token) : null;
const email = decodeToken ? decodeToken.email : null;
const avatar = decodeToken ? decodeToken.avatar : null;
const id = decodeToken ? decodeToken.id : null;
const isAuthenticated = decodeToken ? true: false;
 
const userSlicer = createSlice({
    name:"user",
    initialState: {
        token:token || null,
        id:id,
        email:email,
        avatar:avatar,
        isAuthenticated:isAuthenticated
        
    },
    reducers:{
        setUser:(state, action) => {
            const token = action.payload
            const {email, avatar, id} = jwt_decode(token)
            localStorage.setItem("auth", token)
            state.token = token;
            state.id = id;
            state.email = email;
            state.avatar = avatar;
            state.isAuthenticated = true
        },
        logOut:(state) => {
            localStorage.removeItem("auth");
            state.email = null;
            state.isAuthenticated = false;
            state.token = null;
            state.avatar = null;
            state.id=null;
        } 
    }
})

export const {setUser, logOut} = userSlicer.actions;
export default userSlicer.reducer