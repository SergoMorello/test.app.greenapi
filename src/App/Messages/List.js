import React, { useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import Message from "./Message/Message";
import API from "../../API/API";

const List = () => {
	const userId = API.getId();
	const listRef = useRef();
	const [data, setData] = useState([]);
	
	useEffect(() => {
		const listeners = [];

		listeners.push(API.addListener('changeChatId', () => {
			API.getChatHistory((data) => {
				setData(data);
			});

			listeners.push(API.addChatListener((newMessage) => {
				const messageUserId = newMessage.body.senderData?.chatId;
				setData((state) => {
					const newState = [...state];
					if (typeof state.find((message) => message.idMessage === newMessage?.body.idMessage) === 'undefined') {
						newState.push({
							...newMessage.body,
							chatId: messageUserId,
							textMessage: API.getNotificationText(newMessage),
							type: messageUserId === userId ? 'outgoing' : 'incoming'
						});
					}
					return newState;
				});
			}));
		}));

		return () => {
			for(const listener of listeners) {
				listener.remove();
			}
		}
	},[]);
	
	useEffect(() => {
		listRef.current.scrollTo({
			top: listRef.current.scrollHeight,
			left: 0,
			behavior: 'smooth'
		  });
	},[data]);

	return(<ul className={styles['list']} ref={listRef}>
		{data.map(({textMessage, timestamp, chatId, type}, key) => <Message key={key} timestamp={timestamp} my={type === 'outgoing'}>{textMessage}</Message>)}
	</ul>);
};

export default List;