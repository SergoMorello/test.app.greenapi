import React from "react";
import styles from "./style.module.css";
import { showTime } from "../../../Helpers";

const Chat = ({title, message, timestamp, id, active, onClick}) => {
	const click = () => {
		if (typeof onClick === 'function') {
			onClick(id);
		}
	}

	return(<li className={styles['container'] + (active ? ' ' + styles['active'] : '')} onClick={click}>
		<div className={styles['icon']}>

		</div>
		<div className={styles['info']}>
			<div className={styles['title']}>{title}</div>
			<div className={styles['message']}>{message}</div>
		</div>
		<div className={styles['status']}>
			<div className={styles['timestamp']}>{showTime(timestamp)}</div>
		</div>
	</li>);
};

export default Chat;