import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const callback = () => {
  const { code } = queryString.parse(window.location.search);
  const requestBody = new URLSearchParams();
  // const [user, setUser] = useState('');
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
                              //  // Assuming data contains user information
                              // const loggedInUser = data;

                              // // Store user in local storage
                              // localStorage.setItem('user', JSON.stringify(loggedInUser));

                              // // Set user state in the component
                              // setUser(loggedInUser);
          // navigate(`/auth/2fa?2fa=${data.data}`);
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