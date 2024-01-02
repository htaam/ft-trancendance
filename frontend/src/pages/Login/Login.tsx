import { useEffect, useState } from "react";
import { User } from '../../../../shared/interfaces/talk.interface';

function Login() {
  const login = async () => {
    try {
      const domain = "api.intra.42.fr/oauth";
      const audience = "a";
      const scope = "public";
      const clientId = "u-s4t2ud-5c1567ba9e786c33b15f2eb8f6919213808601f5859cf72aa525de7cae7f4597";
      const responseType = "code";
      const redirectUri = "http://localhost:5173/auth/callback";
      
      const response = await fetch(
        `https://${domain}/authorize?` + 
        `audience=${audience}&` + 
        `scope=${scope}&` +
        `response_type=${responseType}&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}`, {
          redirect: "manual"
        }
      );
  
      window.location.replace(response.url);
    }
    catch{}
  };

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