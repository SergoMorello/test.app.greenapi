import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./App/Login/Login";
import Chats from "./App/Chats/Chats";
import Messages from "./App/Messages/Messages";
import API from "./API/API";

const App = () => {
	const [active, setActive] = useState(false);
	// useEffect(() => {
	// 	API.configure(
	// 		'1101823032',
	// 		'8be3e013b66f4ae3b3a45f58cabb26bed82e4061ec044c299d',
	// 		() => {
	// 			setActive(true);
	// 		}
	// 	);
	// },[]);

	useEffect(() => {
		API.autoLogin(setActive);
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
