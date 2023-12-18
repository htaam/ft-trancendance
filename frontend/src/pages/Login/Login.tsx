import { useEffect, useState } from "react";
import { User } from '../../../../shared/interfaces/talk.interface';

import { LoginForm } from "../../components/_Login/login";
import { LoginLayout } from "../Talk/Layout/LoginLayout";
import Home from "../Home/Home";

export const Login = () => {

	// Store the current user of the client
	const [user, setUser] = useState<User>();

	/* SessionStorage is a browser API that stores the "logged in" user temporarily 
		We will be able to log in a new user per each browser tab */
	useEffect(() => {
		const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}'); // Grab current "Logged in" user
		if (currentUser.id) { // If exists, we know there is a "Logged in" user
			setUser(currentUser); // We set the current "Logged in" user into state
		}

	}, []);


	const login = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	  
		const formValue = (e.currentTarget.elements[0] as HTMLInputElement).value; // Extract login info from the form
	  
		const newUser = {
		  id: Date.now().toLocaleString().concat(formValue),
		  userName: formValue,
		};
	  
		sessionStorage.setItem('user', JSON.stringify(newUser));
		setUser(newUser); // Assuming setUser is defined in your component
	  };

	return (
		<>
			{user && user.id ? ( // If user is "Logged in" render talk element
				<Home />
			) : ( // If user is "Not Logged in" render Log 
				<LoginLayout>
					<LoginForm login={login}></LoginForm>
				</LoginLayout>
			)}
		</>
	);
}

export default Login;