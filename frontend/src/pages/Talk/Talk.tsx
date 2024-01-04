import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client"; // 2.
import {
	ClientToServerEvents, 
	Message,
	ServerToClientEvents,
	User
} from '../../../../shared/interfaces/talk.interface';
import { TalkLayout } from "./Layout/TalkLayout"
import { Messages } from "./Messages/Messages";
import { MessageForm } from "./Messages/MessageForm";
import { Header } from "../Talk/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000", {
//   withCredentials: true, // If needed
// });

export const Talk = () => {
	// Store the clients current state of the connection
	const [isConnected, setIsConnected] = useState(socket.connected);
	// Store a list of messages that have been emitted from the server
	const [messages, setMessages] = useState<Message[]>([]);
	// Store the current user of the client
	const [user, setUser] = useState<User>();

	/* SessionStorage is a browser API that stores the "logged in" user temporarily 
		We will be able to log in a new user per each browser tab */
	useEffect(() => {
		const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}'); // Grab current "Logged in" user
		if (currentUser.id) { // If exists, we know there is a "Logged in" user
			setUser(currentUser); // We set the current "Logged in" user into state
		}

		// Event listener for a 'connect' event
		socket.on('connect', () => {
			setIsConnected(true); // Connect
		});

		// Event listener for a 'disconnect' event
		socket.on('disconnect', () => {
			setIsConnected(false);
		});

		// Event listener for 'talk' event
		socket.on('talk', (e) => {
			setMessages((messages) => [e, ...messages]); //Recieve messages
		});

		// Cleanup procedure to remove event listeners
		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('talk');
		};
	}, []);

	const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	 
		if (user) {
	  		const content = (e.currentTarget.elements[0] as HTMLInputElement).value;
	  
	  		socket.emit('talk', {
				sender: {
		  			id: user.id,
		  			userName: user.userName,
				},
				date: new Date(Date.now()).toLocaleString('en-US'),
				content: content,
	  		});
		}
	};

	return (
		<>
			{user && user.id ? (
				<div className="container-row">
					<Sidebar />
					<div className="container-column">
						<TalkLayout>
							<Header user={user} isConnected={isConnected}></Header>
							<Messages user={user} messages={messages}></Messages>
							<MessageForm sendMessage={sendMessage}></MessageForm>
						</TalkLayout>
					</div>
				</div>
			) : ( // If user is "Not Logged in" render Log 
				<p>Loading...</p> //don't know how to take the "if" statement,,,
			)}
		</>
	);
}

export default Talk;