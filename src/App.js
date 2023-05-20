import React from "react";
import "./App.css";
import Chats from "./App/Chats/Chats";
import Messages from "./App/Messages/Messages";

const App = () => {
	return (
		<div className="container">
			<Chats/>
			<Messages/>
		</div>
	);
}

export default App;
