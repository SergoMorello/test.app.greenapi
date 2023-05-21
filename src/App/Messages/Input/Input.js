import React, { useState } from "react";
import styles from "./style.module.css";

const Input = ({onChange, onSubmit}) => {
	const [text, __setText] = useState('');
	const setText = (event) => {
		const value = event.target.value;
		__setText(value);
		if (typeof onChange === 'function') {
			onChange(value);
		}
	};

	const submit = (e) => {
		e.preventDefault();
		if (typeof onSubmit === 'function') {
			onSubmit(text);
		}
	};

	return(<form className={styles['container']} onSubmit={submit}>
		<textarea placeholder="Введите сообщение" className={styles['text']} value={text} onChange={setText}/>
		<button type="submit" className={styles['send']}/>
	</form>);
};

export default Input;