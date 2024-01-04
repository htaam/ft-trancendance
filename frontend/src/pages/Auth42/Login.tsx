import { useState } from "react";
import Button from "@mui/material/Button";
import DiskImage from "../../images/disk.png";
import LogoImage from "../../images/PONG-logo.png";
import "./Login.css";

function Login() {
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      // Make an API request to the 42 API for authentication
      const response = await fetch("http://localhost:4000/auth/42");
      const data = await response.json();

      if (response.ok) {
        // Redirect to Home page or handle success
        window.location.href = "/home";
      } else {
        // Handle authentication error
        setError(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
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
        Login with 42
      </Button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;