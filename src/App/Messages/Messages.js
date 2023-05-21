import React, { useEffect } from "react";
import styles from "./style.module.css";
import List from "./List";
import Input from "./Input/Input";
import API from "../../API/API";
import * as whatsAppClient from "@green-api/whatsapp-api-client";

const Messages = () => {

	const sendMessage = (text) => {
		API.sendMessage('79032419907', text);
	};

	return(<div className={styles['container']}>
		<div className={styles['background']}/>
		<div className={styles['header']}>

		</div>
		<div className={styles['chat']}>
			<List/>
			<Input onSubmit={sendMessage}/>
		</div>
		
	</div>);
};

export default Messages;