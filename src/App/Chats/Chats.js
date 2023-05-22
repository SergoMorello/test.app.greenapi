import React from "react";
import styles from "./style.module.css";
import List from "./List";
import API from "../../API/API";

const Chats = () => {

	const logout = () => {
		API.logout();
	};

	return(<div className={styles['container']}>
		<div className={styles['header']}>
			<button onClick={logout}>Exit</button>
		</div>
		<List/>
	</div>);
};

export default Chats;