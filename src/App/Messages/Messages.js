import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";
import List from "./List";
import Input from "./Input/Input";
import API from "../../API/API";

const Messages = () => {
	const inputRef = useRef();
	const sendMessage = (text) => {
		API.sendMessage(text);
	};

	useEffect(() => {
		const listener = API.addListener('changeChatId', () => {
			inputRef.current.focus();
		});
		return () => {
			listener.remove();
		}
	},[]);

	return(<div className={styles['container']}>
		<div className={styles['background']}/>
		<div className={styles['header']}>

		</div>
		<div className={styles['chat']}>
			<List/>
			<Input onSubmit={sendMessage} ref={inputRef}/>
		</div>
		
	</div>);
};

export default Messages;