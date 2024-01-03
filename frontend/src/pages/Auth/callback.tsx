import { useState, useEffect } from "react";
import queryString from "query-string";
import { User } from '../../../../shared/interfaces/talk.interface'
import { LoginLayout } from '../../pages/Talk/Layout/LoginLayout';
import { RegForm } from '../../components/RegistrationForm/registrationForm'
import Home from '../../pages/Home/Home';

const Callback = () => {
  const code = new URLSearchParams(document.location.search);
  const [user, setUser] = useState<User>();

	const GetToken = async () => {
		try {
			if (code) {
				const domain = "api.intra.42.fr";
				const grant_type = "authorization_code";
				const client_id = "u-s4t2ud-5c1567ba9e786c33b15f2eb8f6919213808601f5859cf72aa525de7cae7f4597";
				const client_secret = "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";
				const redirect_uri = "http://localhost:5173/auth/callback";
	
				const requestBody = new URLSearchParams();
				requestBody.append("grant_type", grant_type);
				requestBody.append("client_id", client_id);
				requestBody.append("client_secret", client_secret);
				requestBody.append("code", code.toString()); // Convert code to string
				requestBody.append("redirect_uri", redirect_uri);
	
				const response = await fetch(
					`https://${domain}/oauth/token`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: requestBody.toString(),
						redirect: "manual"
					});
	
				if (!response.ok) {
					throw new Error(`Failed to get token: ${response.status} - ${response.statusText}`);
				}
	
				const tokenResult = await response.json();
				console.log("Token Result:", tokenResult);
				// Handle the token result as needed (e.g., store in a state, redirect, etc.)
			}
		} catch (error) {
			console.error('Error during token request:', error);
			// Handle the error, e.g., redirect to an error page or display a message
		}
	};
  useEffect(() => {
    GetToken();
  }, [code]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace 'YOUR_SERVER_BASE_URL' with the actual base URL of your server
  //       const serverBaseUrl = 'http://localhost:3000';
  //       const response = await fetch(`${serverBaseUrl}/auth/callback?code=${code}`);
        
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('FRONT Token Result:', data);
  //         // Handle the token result as needed
  //       } else {
  //         console.error('FRONT Failed to get token:', response.status, response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('FRONT Error during token request:', error);
  //     }
  //   };

  //   // Call the fetchData function when the component mounts
  //   fetchData();
  // }, [code]);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}');
    if (currentUser.id) {
      setUser(currentUser);
    }
  }, []);

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValue = (e.currentTarget.elements[0] as HTMLInputElement).value;

    const newUser = {
      id: Date.now().toLocaleString().concat(formValue),
      userName: formValue,
    };

    sessionStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <>
      {user && user.id ? (
        <Home />
      ) : (
        <LoginLayout>
          <RegForm register={register}></RegForm>
        </LoginLayout>
      )}
    </>
  );
};

export default Callback;