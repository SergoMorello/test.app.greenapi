import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import API from "../../../API/API";
import { showTime } from "../../../Helpers";

const Header = () => {
	const [chatId, setChatId] = useState('');
	const [currentContact, setCurrentContact] = useState({
		title: '',
		timestamp: 0
	});

	useEffect(() => {
		if (chatId) {
			setCurrentContact(API.getContact(chatId));
		}
	},[chatId]);

	useEffect(() => {
		const listener = API.addListener('changeChatId', setChatId);

		return () => {
			listener.remove();
		}
	},[]);
	
	if (currentContact && currentContact.title === '') {
		return(null);
	}

	return(<div className={styles['container']}>
		<div className={styles['icon']}></div>
		<div className={styles['info']}>
			<div className={styles['title']}>{currentContact.title}</div>
			<div className={styles['last']}>Last message: {showTime(currentContact.timestamp)}</div>
		</div>
	</div>);
};

export default Header;