import React, { useState } from "react";
import styles from "./style.module.css";
import Chat from "./Chat/Chat";
import API from "../../API/API";
import InputMask from 'react-input-mask';

const List = () => {
	const [data, setData] = useState([]);
	const [newPhone, setNewPhone] = useState('');

	const phoneHandle = (e) => {
		const value = (e.target?.value ?? '').replace(/[^0-9]/g, '');
		setNewPhone(value);
	};

	const create = (e) => {
		e.preventDefault();
		selectChat(newPhone);
		setData((state) => [...state, newPhone]);
		setNewPhone('');
	};

	const selectChat = (phone) => {
		API.setChatId(phone);
	};

	return(<>
	<form className={styles['newChat']} onSubmit={create}>
		<InputMask mask="+9 (999) 999-99-99" placeholder="Phone number" value={newPhone} onChange={phoneHandle}/>
		<button type="submit">+</button>
	</form>
	<ul className={styles['list']}>
		{data.map((phone, key) => <Chat key={key} title={phone} onClick={selectChat}/>)}
	</ul>
	</>);
};

export default List;