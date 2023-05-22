import React from "react";
import styles from "./style.module.css";
import { showTime } from "../../../Helpers";

const Message = ({children, my, timestamp}) => {

	return(<li className={styles['container'] + (my ? ' ' + styles['my'] : '')}>
		<div className={styles['message']}>
			<span className={styles['text']}>{children}</span>
			<div className={styles['info']}>
				<span className={styles['date']}>{showTime(timestamp)}</span>
			</div>
		</div>
	</li>);
};

export default Message;