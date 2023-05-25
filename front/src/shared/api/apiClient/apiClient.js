import {createAsyncThunk} from "@reduxjs/toolkit";

export const clientChatByClientId = createAsyncThunk(
    "chats/fetchChats",
    async ({access_token, clientId}) => {
        const url = `http://localhost:8081/api/chat/client/getClientChatByClientId?clientId=${clientId}`;
        return await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            })
            .then(r => {
                return r.json()
            })

            .catch((error) => {
                console.error(error)
            })
    })




