import Button from "@mui/material/Button";
import DiskImage from "../../images/disk.png";
import LogoImage from "../../images/PONG-logo.png";
import "./Login.css";

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
