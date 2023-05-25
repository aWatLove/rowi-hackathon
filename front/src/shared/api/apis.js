import {useHttp} from "./http.hook.js";
import ky from "ky";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message} from "../../entities/message/model/Message.js"
import {json} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clientChatByClientId} from "./apiClient/apiClient.js";

const api = ky.create({
    prefixUrl: "http://localhost:8081/api"
})
const {post, get, postWithAuth} = useHttp(api);
// export const loginUser = createAsyncThunk(
//
// )
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({password, login}) => {
        const url = 'http://localhost:9090/auth/realms/master/protocol/openid-connect/token';
        const formData = new URLSearchParams();
        formData.append('client_id', 'hackathon-public');
        formData.append('username', login);
        formData.append('password', password);
        formData.append('grant_type', 'password');
        return await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        })
            .then((response) => response.json())
            .then(user => {
                console.log(user)
                return {login: login, access_token: user.access_token, refresh_token: user.refresh_token}

            })
            .then(user => {
                console.log(user)
                return refreshToken(user.refresh_token, user.access_token, user.login)
            })
            .then(user => {
                return getUserRoleId(user.refresh_token, user.login, user.access_token)
            })

            .catch((error) => {
                console.error(error)
            });
    }
)
//http://localhost:8081/api/chat/message/get?clientId=646ccc7da7300f004d9a532d
export const updateMessages = createAsyncThunk(
    "chats/updateMessages",
    async ({clientId, access_token}) => {
        const url = `http://localhost:8081/api/chat/message/get?clientId=${clientId}`;
        return await fetch(
            url,
            {
                method: 'GET',
                headers: {

                    'Authorization': `Bearer ${access_token}`,
                }
            })
            .then(r => r.json())
    }
)
export const addMessage = createAsyncThunk(
    "chats/addMessage",
    async ({access_token, clientId, message}) => {
        const url = `http://localhost:8081/api/chat/message/send?clientId=${clientId}`;
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify(message),
        })
            .then(r => {
                return r.json()
            })

            .catch((error) => {
                console.error(error)
            })
    })
///api/manager/chat/getByChatCategoryAndStatus
//
export const getChatsForManager = createAsyncThunk(
    "chats/fetchChatsForManager",
    async ({access_token, chatStatus, chatCategory}) => {
        const url = `http://localhost:8081/api/manager/chat/getByChatCategoryAndStatus?chatCategory=${chatCategory}&chatStatus=${chatStatus}`;
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        })
            .then(r => {
                return r.json()
            })

            .catch((error) => {
                console.error(error)
            })
    })


export const refreshToken = async (refresh_token, access_token, login) => {
    // const {refresh_token, access_token, login} = user;
    const url = 'http://localhost:9090/auth/realms/master/protocol/openid-connect/token';
    const formData = new URLSearchParams();
    formData.append('client_id', 'hackathon-public');
    formData.append('refresh_token', refresh_token);
    formData.append('grant_type', 'refresh_token');
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${access_token}`,
        },
        body: formData.toString(),
    })
        .then((response) => response.json())
        .then(user => {
            return {login: login, access_token: access_token, refresh_token: user.refresh_token}
        })

        .catch((error) => console.error(error))


}
export const getUserRoleId = async (refresh_token, login, access_token) => {
    const url = `http://localhost:8081/api/user/auth/${login}`;
    return await fetch(
        url,
        {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${access_token}`,
            }
        })
        .then(r => r.json())
        // .then((response) => response.json())
        .then(({id, role}) => {
            return {id: id, role: role, login, refresh_token, access_token}
        })
        .catch((error) => {
            console.error(error)
        })
}
