import React from "react";
import styles from "./style.module.css";

const Message = ({children, my, date}) => {

	return(<li className={styles['container'] + (my ? ' ' + styles['my'] : '')}>
		<div className={styles['message']}>
			<span className={styles['text']}>{children}</span>
			<div className={styles['info']}>
				<span className={styles['date']}>00:00</span>
			</div>
		</div>
	</li>);
};

export default Message;