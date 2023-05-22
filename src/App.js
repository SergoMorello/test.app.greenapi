import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./App/Login/Login";
import Chats from "./App/Chats/Chats";
import Messages from "./App/Messages/Messages";
import API from "./API/API";

const App = () => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		API.autoLogin(setActive);
		const listener = API.addListener('logout', () => {
			setActive(false);
		});
		return () => {
			listener.remove();
		}
	},[]);

	return (
		<div className="container">
			{
				active ? <>
				<Chats/>
				<Messages/>
				</> :
				<Login onSubmit={setActive}/>
			}
			
		</div>
	);
}

export default App;
