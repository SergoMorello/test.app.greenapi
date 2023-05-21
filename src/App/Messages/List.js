import React, { useEffect } from "react";
import styles from "./style.module.css";
import Message from "./Message/Message";
import whatsAppClient from "@green-api/whatsapp-api-client";
import API from "../../API/API";

const List = () => {

	useEffect(() => {
		// API.getChat('79032419907', (e) => {
		// 	console.log(e);
		// })
		// (async () => {
		// 	let restAPI = whatsAppClient.restAPI({
		// 	  idInstance: "1101823032",
		// 	  apiTokenInstance: "8be3e013b66f4ae3b3a45f58cabb26bed82e4061ec044c299d",
		// 	});
		  
		// 	try {
		// 	  // Receive WhatsApp notifications.
		// 	  console.log("Waiting incoming notifications...");
		// 	  await restAPI.webhookService.startReceivingNotifications();
		// 	  restAPI.webhookService.onReceivingMessageText((body) => {
		// 		console.log(body);
		// 		restAPI.webhookService.stopReceivingNotifications();
		// 		//console.log("Notifications is about to stop in 20 sec if no messages will be queued...")
		// 	  });
		// 	  restAPI.webhookService.onReceivingDeviceStatus((body) => {
		// 		console.log(body);
		// 	  });
		// 	  restAPI.webhookService.onReceivingAccountStatus((body) => {
		// 		console.log(body);
		// 	  });
		// 	} catch (ex) {
		// 	  console.error(ex.toString());
		// 	}
		//   })();
	},[]);

	return(<ul className={styles['list']}>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message my>test</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
		<Message>123 dgsdgsg dfgdgrdr dfg dfg {'\n'} dfgdfgdfh df hdfhd hdf gdfgdfgd</Message>
	</ul>);
};

export default List;