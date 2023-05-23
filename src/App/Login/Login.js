import React, { useState } from "react";
import styles from "./style.module.css";
import API from "../../API/API";

const Login = ({onSubmit}) => {
	const [wait, setWait] = useState(false);
	const [data, setData] = useState({
		idInstance: '',
		apiTokenInstance: ''
	});

	const setSubmit = (args) => {
		if (typeof onSubmit === 'function') {
			onSubmit(args);
		}
		setWait(false);
	};

	const submit = (e) => {
		e.preventDefault();
		setWait(true);
		API.configure(
			data.idInstance,
			data.apiTokenInstance,
			setSubmit
		);
	};

	const inputHandle = (e) => {
		setData((state) => ({...state, [e.target?.id]: e.target?.value}))
	};
	
	return(<div className={styles['container']}>
		<form onSubmit={submit} className={styles['form']}>
			<input placeholder="YOUR ID INSTANCE" id="idInstance" value={data.idInstance} onChange={inputHandle}/>
			<input placeholder="YOUR API TOKEN INSTANCE" id="apiTokenInstance" value={data.apiTokenInstance} onChange={inputHandle}/>
			{
				wait ? <div className="spinner animate"/> :
					<button type="submit">Login</button>
			}
		</form>
	</div>);
};

export default Login;