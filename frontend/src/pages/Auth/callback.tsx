import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const callback = () => {
  const { code } = queryString.parse(window.location.search);
  const requestBody = new URLSearchParams();
  const navigate = useNavigate();
  requestBody.append("code", code as string);

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:4000/auth/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(),
      })
        .then(response => response.json())
        .then(data => {
          const requestBody2fa = new URLSearchParams();
          requestBody2fa.append("hash", data.data as string);
          fetch(`http://localhost:4000/auth/2fa/check-on`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody2fa.toString(),
      }).then(res => res.json())
      .then((data) => {
            if (data.data == false)
                navigate('/home/')
            else
                navigate('/TwoAuth');
        })
        })
        .catch(error => console.error('Error fetching callback:', error));
    }
  }, [code]);
  return (
    <div className="callback">
      {/* Renderize o que você precisa com base nos dados de callback */}
      <Sidebar />
    </div>
  );
}

export default callback;


// import { useState, useEffect } from "react";
// import queryString from "query-string";
// import { User } from '../../../../shared/interfaces/talk.interface'
// import { LoginLayout } from '../../pages/Talk/Layout/LoginLayout';
// import { RegForm } from '../../components/RegistrationForm/registrationForm'
// import Home from '../../pages/Home/Home';

// const Callback = () => {
//   const { code } = queryString.parse(window.location.search);
//   const [user, setUser] = useState<User>();

// 	const GetToken = async () => {
// 		try {
// 			if (code) {
// 				const domain = "api.intra.42.fr";
// 				const grant_type = "authorization_code";
// 				const client_id = "u-s4t2ud-5c1567ba9e786c33b15f2eb8f6919213808601f5859cf72aa525de7cae7f4597";
// 				const client_secret = "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";
// 				const redirect_uri = "http://localhost:5173/auth/callback";
	
// 				const requestBody = new URLSearchParams();
// 				requestBody.append("grant_type", grant_type);
// 				requestBody.append("client_id", client_id);
// 				requestBody.append("client_secret", client_secret);
// 				requestBody.append("code", code.toString()); // Convert code to string
// 				requestBody.append("redirect_uri", redirect_uri);
	
// 				const response = await fetch(
// 					`https://${domain}/oauth/token`, {
// 						method: 'POST',
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`,
//               'Access-Control-Allow-Origin': '*',
//           },
// 						body: requestBody.toString(),
// 						redirect: "manual"
// 					});
	
// 				if (!response.ok) {
// 					throw new Error(`Failed to get token: ${response.status} - ${response.statusText}`);
// 				}
	
// 				const tokenResult = await response.json();
// 				console.log("Token Result:", tokenResult);
// 				// Handle the token result as needed (e.g., store in a state, redirect, etc.)
// 			}
// 		} catch (error) {
// 			console.error('Error during token request:', error);
// 			// Handle the error, e.g., redirect to an error page or display a message
// 		}
// 	};
//   useEffect(() => {
//     GetToken();
//   }, [code]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // Replace 'YOUR_SERVER_BASE_URL' with the actual base URL of your server
//   //       const serverBaseUrl = 'http://localhost:4000';
//   //       const response = await fetch(`${serverBaseUrl}/auth/callback?code=${code}`);
        
//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         console.log('FRONT Token Result:', data);
//   //         // Handle the token result as needed
//   //       } else {
//   //         console.error('FRONT Failed to get token:', response.status, response.statusText);
//   //       }
//   //     } catch (error) {
//   //       console.error('FRONT Error during token request:', error);
//   //     }
//   //   };

//   //   // Call the fetchData function when the component mounts
//   //   fetchData();
//   // }, [code]);

//   useEffect(() => {
//     const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}');
//     if (currentUser.id) {
//       setUser(currentUser);
//     }
//   }, []);

//   const register = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formValue = (e.currentTarget.elements[0] as HTMLInputElement).value;

//     const newUser = {
//       id: Date.now().toLocaleString().concat(formValue),
//       userName: formValue,
//     };

//     sessionStorage.setItem('user', JSON.stringify(newUser));
//     setUser(newUser);
//   };

//   return (
//     <>
//       {user && user.id ? (
//         <Home />
//       ) : (
//         <LoginLayout>
//           <RegForm register={register}></RegForm>
//         </LoginLayout>
//       )}
//     </>
//   );
// };

// export default Callback;