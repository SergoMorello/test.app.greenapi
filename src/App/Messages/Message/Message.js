import React from "react";
import styles from "./style.module.css";

const Message = ({children, my, timestamp}) => {
	const date = new Date(timestamp ?? null);
	const renderTime = date.getHours() + ':' + date.getMinutes();
	return(<li className={styles['container'] + (my ? ' ' + styles['my'] : '')}>
		<div className={styles['message']}>
			<span className={styles['text']}>{children}</span>
			<div className={styles['info']}>
				<span className={styles['date']}>{renderTime}</span>
			</div>
		</div>
	</li>);
};

export default Message;