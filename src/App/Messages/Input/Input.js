import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import styles from "./style.module.css";

const Input = forwardRef(({value, onChange, onSubmit},ref) => {
	const inputRef = useRef();
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

	useImperativeHandle(ref, () => inputRef.current);

	useEffect(() => {
		__setText(value);
	},[value]);

	useEffect(() => {
		if (!inputRef.current) {
			return;
		}
		inputRef.current.style.height = 0;
		const height = inputRef.current.scrollHeight;
		inputRef.current.style.height = height + 'px';
	},[text]);

	return(<form className={styles['container']} onSubmit={submit}>
		<div className={styles['text-container']}>
			<textarea placeholder="Введите сообщение" className={styles['text']} value={text} onChange={setText} onKeyDown={onEnterPress} ref={inputRef}/>
		</div>
		<div className={styles['send-container']}>
			<button type="submit" className={styles['send']}/>
		</div>
	</form>);
});

export default Input;