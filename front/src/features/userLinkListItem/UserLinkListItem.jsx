import "./UserLinkListItem.scss"
import {useDispatch, useSelector} from "react-redux";
import {updateMessages} from "../../shared/api/apis.js";
import {Cookies} from "react-cookie";
import {changeActiveChatId} from "../../entities/chat/chatsSlice.js";
import {getActiveChatId} from "../../entities/chat/selectors.js";
export const UserLinkListItem = ({chatId, chatCategory, chatStatus, clientId, clientName}) => {
	const activeChatId = useSelector(getActiveChatId);
	const dispatch = useDispatch();
	const cookies = new Cookies();
	const u = cookies.get("user");
	return (
		<div onClick={() => {
			dispatch(changeActiveChatId(chatId))
			dispatch(updateMessages({access_token:u.access_token,clientId:clientId}))
		}} className="userLinkItem">
			<h1>{clientName}</h1>
		</div>
	)
}