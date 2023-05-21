import React, { useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import Message from "./Message/Message";
import API from "../../API/API";

const List = () => {
	const userId = API.getId();
	const listRef = useRef();
	const [data, setData] = useState([]);

	useEffect(() => {
		API.getChat('79032419907').then((data) => {
			if (Array.isArray(data)) {
				setData(data.reverse());
			}
		});

		const listener = API.addChatListener('79032419907', (newMessage) => {
			setData((state) => [...state, newMessage]);
		});

		return () => {
			listener.remove();
		}
	},[]);

	useEffect(() => {
		listRef.current.scrollTo(0, listRef.current.scrollHeight);
	},[data]);

	return(<ul className={styles['list']} ref={listRef}>
		{data.map(({textMessage, timestamp, chatId}, key) => <Message key={key} timestamp={timestamp} my={chatId === userId}>{textMessage}</Message>)}
	</ul>);
};

export default List;