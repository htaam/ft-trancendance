import Button from "@mui/material/Button";
import DiskImage from '../../images/disk.png'
import LogoImage from "../../images/PONG-logo.png";
import "./Login.css";
import{ User } from '../../../../shared/interfaces/talk.interface'
import { useEffect, useState } from "react";
import Home from "../Home/Home";

export const  Login = () => {

  // Store the current user 
  const [user, setUser] = useState<User>();

  // Session Storage is a browser API that stores the 'logged in' user temporarily
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}'); // grab current loggedin user
    if (currentUser.id) {
      setUser(currentUser); // we set the current logged in user into state
    }
  }, []);

  const login = async () => {
    try {
      const domain = "api.intra.42.fr/oauth";
      const audience = "a";
      const scope = "public";
      const client_id = "u-s4t2ud-5c1567ba9e786c33b15f2eb8f6919213808601f5859cf72aa525de7cae7f4597";
      const responseType = "code";
      const redirectUri = "http://localhost:5173/auth/callback";
      
      const response = await fetch(
        `https://${domain}/authorize?` + 
        `audience=${audience}&` + 
        `scope=${scope}&` +
        `response_type=${responseType}&` +
        `client_id=${client_id}&` +
        `redirect_uri=${redirectUri}`, {
          redirect: "manual"
        }
      );
      window.location.replace(response.url);
    }
    catch{}
  };

  return (
    <>
      { user && user.id ? (
        <Home />
      ) : (
        <div className="login">
          <img className="disk" src={DiskImage} alt="Diskette Illustration" />
          <img className="logo" src={LogoImage} alt="Logo Pong" />
          <p className="slogan">Play Old Nice Games</p>
          <Button
            className="button"
            onClick={login}
            type="button"
            variant="contained"
            color="primary"
          >
            Login with 42 Intra
          </Button>
        </div>
      )}
    </>
  );
}

export default Login;