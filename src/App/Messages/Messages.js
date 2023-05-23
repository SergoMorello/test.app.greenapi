import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Header from "./Header/Header";
import List from "./List";
import Input from "./Input/Input";
import API from "../../API/API";

const Messages = () => {
	const inputRef = useRef();

	const [selectedChat, setSelectedChat] = useState('');

	const sendMessage = (text) => {
		API.sendMessage(text);
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	},[selectedChat]);

	useEffect(() => {
		const listener = API.addListener('changeChatId', setSelectedChat);
		return () => {
			listener.remove();
		}
	},[]);

	return(<div className={styles['container']}>
		<div className={styles['background']}/>
		<Header/>
		<div className={styles['chat']}>
			<List/>
			{selectedChat ? <Input onSubmit={sendMessage} ref={inputRef}/> : null}
		</div>
		
	</div>);
};

export default Messages;