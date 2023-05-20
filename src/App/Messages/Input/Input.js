import React from "react";
import styles from "./style.module.css";

const Input = () => {

	return(<div className={styles['container']}>
		<textarea placeholder="Введите сообщение" className={styles['text']}/>
		<div className={styles['send']}/>
	</div>);
};

export default Input;