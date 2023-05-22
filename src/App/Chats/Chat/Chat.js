import React from "react";
import styles from "./style.module.css";

const Chat = ({title, onClick}) => {

	const click = () => {
		if (typeof onClick === 'function') {
			onClick(title);
		}
	}

	return(<li className={styles['container']} onClick={click}>
		<div className={styles['icon']}>

		</div>
		<div className={styles['info']}>
			<div className={styles['title']}>{title}</div>
		</div>
	</li>);
};

export default Chat;