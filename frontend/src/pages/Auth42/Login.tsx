import Button from "@mui/material/Button";
import DiskImage from "../../images/disk.png";
import LogoImage from "../../images/PONG-logo.png";
import "./Login.css";

function Login() {
  const login = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You may need to include credentials: "include" if using cookies
      });

      if (response.ok) {
        // Redirect the user to the provided URL for authentication
        const { url } = await response.json();
        window.location.href = url;
      } else {
        console.error("Failed to initiate login");
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
        Login with 42 Intra
      </Button>
    </div>
  );
}

export default Login;
