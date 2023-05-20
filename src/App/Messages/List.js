import React from "react";
import styles from "./style.module.css";
import Message from "./Message";

const List = () => {

	return(<ul className={styles['list']}>
		<Message text="123"/>
	</ul>);
};

export default List;