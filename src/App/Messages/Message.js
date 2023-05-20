import React from "react";
import styles from "./style.module.css";

const Message = ({text, date}) => {

	return(<li className={styles['message']}>{text}</li>);
};

export default Message;