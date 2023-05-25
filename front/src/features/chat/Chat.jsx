import {UserLinksList} from "../../widgets/userLinksList/UserLinksList.jsx";
import {MessageBlock} from "../../widgets/messageBlock/MessageBlock.jsx";
import "./Chat.scss"
import {useDispatch, useSelector} from "react-redux";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {addMessage, updateMessages} from "../../shared/api/apis.js";
import {Message} from "../../entities/message/model/Message"
import {getActiveChatId, getChatsLoadingStatus} from "../../entities/chat/selectors.js";
export const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    let activeIdChat = 0;
     activeIdChat = useSelector(getActiveChatId)

    const chats = useSelector(state => state.chats.chats)

    // const clientId = "646ccc7da7300f004d9a532d"
    const {id, role} = user;
    const [typedBodyMessage, setTypedBodyMessage] = useState("");
    if (!user) return null;
    const adminAside = role === "manager" ? <ManagerAside/> : null;
    return (
        <div className="chat flex-column">
            {adminAside}
            <div className="messagesBlock">
                <MessageBlock/>
            </div>
            <div className="typeMessage">
                <InputText
                    onChange={(e) => {
                        setTypedBodyMessage(e.target.value)
                    }}
                    onKeyDown={e => {
                    if (e.key === "Enter" || e.keyCode === 13) {
                        if(typedBodyMessage.trim() !== "" && activeIdChat !== "" && activeIdChat != null) {
                            const clientId = chats[activeIdChat].clientId
                            if(role === "client"){
                                dispatch(addMessage({message:new Message(id, typedBodyMessage), clientId : id, access_token : user.access_token}))
                                dispatch(updateMessages({access_token:user.access_token,clientId:id}))
                            }else {
                                dispatch(addMessage({message:new Message(id, typedBodyMessage), clientId : clientId, access_token : user.access_token}))

                                dispatch(updateMessages({access_token:user.access_token,clientId:clientId}))

                            }
                            setTypedBodyMessage("")

                        }
                    }


                }
                }/>
            </div>
        </div>
    )
}
const ManagerAside = () => {
    return (
        <aside className="ls">
            <UserLinksList/>
        </aside>
    )
}