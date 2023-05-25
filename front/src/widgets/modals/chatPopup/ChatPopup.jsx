import Dialog from "../../dialog/Dialog.jsx";
import {useDispatch, useSelector} from "react-redux";
import {isChatModelOpen} from "../selectors.js";
import {closeChat, openChat} from "../modalsSlice.js";
import React from "react";
import "./ChatPopup.scss"
import {Chat} from "../../../features/chat/Chat.jsx";
import {ROLE} from "../../../shared/api/auth/selectors.js";
import {clientChatByClientId} from "../../../shared/api/apiClient/apiClient.js";
import {Cookies} from "react-cookie";

export const ChatPopup = () => {
    const dispatch = useDispatch();
    const isChatOpen = useSelector(isChatModelOpen);
    const cookie = new Cookies()
    const user = cookie.get("user")
    // const idC = useSelector(state => state.chats.chats.clientId)
    return (
        <Dialog
            header={<div className="bg-blue-600"></div>}
            className="chatPopup"
            isFooter={false}
            close={() => {
                dispatch(closeChat())
            }}
            open={() => {
                // dispatch(clientChatByClientId({access_token : user.access_token, clientId : idC}))
                dispatch(openChat())
            }} isOpen={isChatOpen} primeReactIconClassName="pi-calendar">
            <Chat/>
        </Dialog>
    )
}

