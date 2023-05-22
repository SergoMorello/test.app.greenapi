import React from "react";
import styles from "./style.module.css";

const Message = ({children, my, timestamp}) => {
	const date = timestamp ? new Date(timestamp) : new Date;
	const renderTime = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
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