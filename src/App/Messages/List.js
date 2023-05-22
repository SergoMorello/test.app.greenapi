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
			API.getChat((data) => {
				setData(data);
			});
			listeners.push(API.addChatListener((newMessage) => {
				const messageUserId = newMessage.senderData?.chatId;
				if (userId === messageUserId) {
					return;
				}
				setData((state) => {
					const newState = [...state];
					if (typeof state.find((message) => message.idMessage === newMessage.idMessage) === 'undefined') {
						newState.push({
							...newMessage,
							chatId: messageUserId,
							textMessage: newMessage.messageData?.textMessageData?.textMessage
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
		listRef.current.scrollTo(0, listRef.current.scrollHeight);
	},[data]);

	return(<ul className={styles['list']} ref={listRef}>
		{data.map(({textMessage, timestamp, chatId}, key) => <Message key={key} timestamp={timestamp} my={chatId === userId}>{textMessage}</Message>)}
	</ul>);
};

export default List;