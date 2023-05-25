import {createSlice} from '@reduxjs/toolkit';
import {clientChatByClientId} from "../../shared/api/apiClient/apiClient.js";
import {logoutUser} from "../../shared/api/auth/authSlice.js";
import {addMessage, getChatsForManager, updateMessages} from "../../shared/api/apis.js";
const initialState = {
    chatsLoadingStatus: "idle",
    activeChatId:"",

}

const ChatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        changeActiveChat (state, action){
            state.activeChatId = action.payload
        },
        changeActiveChatId(state, action){
            state.activeChatId = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(clientChatByClientId.pending, (state,action) => {
                state.chatsLoadingStatus = "loading";
            })
            .addCase(clientChatByClientId.fulfilled, (state,action) => {
                state.chats = action.payload;
                state.chatsLoadingStatus = "access";
            })
            .addCase(clientChatByClientId.rejected, (state,action) => {
                state.chatsLoadingStatus = "error";
            })
            .addCase(addMessage.pending, (state,action) => {
                state.chatsLoadingStatus = "loading";

            })
            .addCase(addMessage.fulfilled, (state,action) => {
                state.chatsLoadingStatus = "access";


            })
            .addCase(addMessage.rejected, (state,action) => {
                state.chatsLoadingStatus = "error";

            })
            .addCase(updateMessages.pending, state => {
                state.chatsLoadingStatus = "loading";

            })
            .addCase(updateMessages.rejected, state => {
                state.chatsLoadingStatus = "error";

            })
            .addCase(updateMessages.fulfilled, (state,action) => {
                state.chats = {...state.chats, messages: action.payload}
                state.chatsLoadingStatus = "access";
            })
            .addCase(getChatsForManager.fulfilled, (state,action) => {
                state.chats = action.payload;
                state.chatsLoadingStatus = "access";
            })
        //getChatsForManager
    }

})
export const {changeActiveChatId} = ChatSlice.actions
export default ChatSlice.reducer