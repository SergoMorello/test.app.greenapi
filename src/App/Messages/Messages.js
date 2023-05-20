import React from "react";
import styles from "./style.module.css";
import List from "./List";
import Input from "./Input/Input";

const Messages = () => {

	return(<div className={styles['container']}>
		<div className={styles['background']}/>
		<div className={styles['header']}>

		</div>
		<div className={styles['chat']}>
			<List/>
			<Input/>
		</div>
		
	</div>);
};

export default Messages;