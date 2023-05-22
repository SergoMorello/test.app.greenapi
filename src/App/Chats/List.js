import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Chat from "./Chat/Chat";
import API from "../../API/API";
import InputMask from 'react-input-mask';

const List = () => {
	const [selectChatId, setSelectChatId] = useState('');
	const [data, setData] = useState([]);
	const [newPhone, setNewPhone] = useState('');

	const phoneHandle = (e) => {
		const value = (e.target?.value ?? '');
		setNewPhone(value);
	};

	const create = (e) => {
		e.preventDefault();
		const newChat = {
			title: newPhone,
			id: newPhone.replace(/[^0-9]/g, '') + '@c.us',
			message: '',
			timestamp: 0
		};
		selectChat(newChat.id);
		setData((state) => [...state, newChat]);
		setNewPhone('');
	};

	const selectChat = (phone) => {
		API.setChatId(phone);
	};

	const setLastMessage = (message) => {
		setData((state) => {
			return state.map((mes) => mes.id === message.chatId ? {
				...mes,
				message: message.textMessage,
				timestamp: message.timestamp
			} : mes);
		});
	};

	useEffect(() => {
		const listeners = [];

		listeners.push(API.addListener('changeChatId', setSelectChatId));

		listeners.push(API.addListener('lastChatMessage', setLastMessage));

		return () => {
			for(const listener of listeners) {
				listener.remove();
			}
		}
	},[]);

	return(<>
		<form className={styles['new-chat']} onSubmit={create}>
			<InputMask mask="+9 (999) 999-99-99" placeholder="Phone number" value={newPhone} onChange={phoneHandle}/>
			<button type="submit">+</button>
		</form>
		<ul className={styles['list']}>
			{data.map((chat, key) => <Chat key={key} title={chat.title} message={chat.message} timestamp={chat.timestamp} id={chat.id} active={selectChatId === chat.id} onClick={selectChat}/>)}
		</ul>
	</>);
};

export default List;