import {Cookies} from "react-cookie";
import {createSlice} from "@reduxjs/toolkit";
import {loginUser} from "../apis.js";

const cookies = new Cookies();
const user =  cookies.get("user");

const initialState =
    user && typeof user !== "string"?
        {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser : (state,_) => {
            state.user = null;
            state.isLoggedIn = false
            cookies.set("user", null);
        }
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user =  action.payload;
            cookies.set("user", action.payload);
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        // [authorize.pending] : (state,action) => {
        //
        //     console.log("loading")
        //
        // },
        // [authorize.rejected] : (state,action) => {
        //     console.log("rejected")
        //
        // },
        // [authorize.fulfilled] : (state,action) => {
        //     console.log(action.payload)
        //     state.isLoggedIn = true;
        //     state.user.id = action.payload
        // }

    }
})


const {actions, reducer} = authSlice;
export const {logoutUser} = actions;

export default reducer