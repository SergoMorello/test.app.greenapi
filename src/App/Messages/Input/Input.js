import React, { useEffect, useState, forwardRef } from "react";
import styles from "./style.module.css";

const Input = forwardRef(({value, onChange, onSubmit},ref) => {
	const [text, __setText] = useState(value ?? '');
	const setText = (event) => {
		const value = event.target.value;
		__setText(value);
		if (typeof onChange === 'function') {
			onChange(value);
		}
	};

	const submit = (e) => {
		e?.preventDefault();
		__setText('');
		if (typeof onSubmit === 'function') {
			onSubmit(text);
		}
	};

	const onEnterPress = (e) => {
		if(e.keyCode === 13 && e.shiftKey === false) {
			submit(e);
		}
	};

	useEffect(() => {
		__setText(value);
	},[value]);

	return(<form className={styles['container']} onSubmit={submit}>
		<textarea placeholder="Введите сообщение" className={styles['text']} value={text} onChange={setText} onKeyDown={onEnterPress} ref={ref}/>
		<button type="submit" className={styles['send']}/>
	</form>);
});

export default Input;