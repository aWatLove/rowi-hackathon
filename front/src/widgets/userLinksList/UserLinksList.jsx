import {UserLinkListItem} from "../../features/userLinkListItem/UserLinkListItem.jsx";
import  "./UserLinksList.scss"
import {useState} from "react";
import {useSelector} from "react-redux";
import {getChatsForManager} from "../../shared/api/apis.js";
import {getClientChatsForManager} from "../../entities/chat/selectors.js";
export const UserLinksList = () => {
	const chats = useSelector(getClientChatsForManager);
	const chatsArray = []

	for(let chat in chats){
		chatsArray.push(chats[chat])
	}
	return (
		<div className="userLinkList">
			{chatsArray.map((chat,index) => {
				return <UserLinkListItem chatId={index} clientId={chat.clientId} clientName={chat.clientName} key = {index}/>
			})}
		</div>
	)
}