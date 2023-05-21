import React from "react";
import "./App.css";
import Chats from "./App/Chats/Chats";
import Messages from "./App/Messages/Messages";
import API from "./API/API";
API.setUser(
	'1101823032',
	'8be3e013b66f4ae3b3a45f58cabb26bed82e4061ec044c299d'
);
const App = () => {
	return (
		<div className="container">
			<Chats/>
			<Messages/>
		</div>
	);
}

export default App;
