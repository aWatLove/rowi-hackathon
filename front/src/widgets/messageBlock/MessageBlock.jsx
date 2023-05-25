import {Message} from "../../entities/message/ui/Message.jsx"
import "./MessageBlock.scss"
import {useDispatch, useSelector} from "react-redux";
import {ID, ROLE} from "../../shared/api/auth/selectors.js";
import {useEffect, useId, useMemo} from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import {
    getMessages,
    getChatsLoadingStatus,
    getClientChatsForManager,
    getActiveChatId
} from "../../entities/chat/selectors.js";
import {getChatsForManager} from "../../shared/api/apis.js";

export const MessageBlock = () => {

    let activeChatId = useSelector(getActiveChatId)
    if(activeChatId == "") activeChatId = 0
    const id = useSelector(ID);
    const role = useSelector(ROLE);
    const dispatch = useDispatch();

    let messages = []
    if (role === "manager") {
        messages = useSelector(getClientChatsForManager);

    } else {
        messages = useSelector(getMessages);
    }
    const messagesActive = activeChatId!=="" && activeChatId != null? messages[activeChatId].messages:[]
    const status = useSelector(getChatsLoadingStatus)
    const spinner = status === "loading" ? <ProgressSpinner/> : null;
    const content = status === "access" ? <View isManager={role === "manager"} messages={messagesActive} id={id}/> : null;
    return (
        <div className="messagesList">
            {content}
            {spinner}
        </div>
    )
}
const View = ({messages, id, isManager}) => {
    const messagesArray = Array.from(messages)
    console.log(messagesArray)
    let elements = [];
    elements =
        messagesArray?.map(({senderId, text, timestamp, }) => {
            return <Message key={useId()} isYourSelf={senderId === id} who={senderId}>
                {text}
            </Message>
        })

    return (
        <div>
            {elements}
        </div>
    )
}