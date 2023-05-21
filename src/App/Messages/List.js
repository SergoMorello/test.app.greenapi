import React from "react";
import styles from "./style.module.css";
import Message from "./Message/Message";

const List = () => {

	return(<ul className={styles['list']}>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message my>test</Message>
	</ul>);
};

export default List;