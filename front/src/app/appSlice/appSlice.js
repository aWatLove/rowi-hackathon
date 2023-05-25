import {Cookies} from "react-cookie";
import {createSlice} from "@reduxjs/toolkit";


const cookies = new Cookies()
const user = cookies.get("user")
const initialState = {
    isInit : !!user
}
const initSlice = createSlice({
    name: 'init',
    initialState,
    reducers: {
        init : (state, action) => {

        }
    },
    extraReducers : (builder) => {

    }

})
export const {} = initSlice.actions
export default initSlice.reducer