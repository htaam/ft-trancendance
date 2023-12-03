'use client'
import Button from "@mui/material/Button";
import DiskImage from "../../images/disk.png";
import LogoImage from "../../images/PONG-logo.png";
import "./Login.css";
import { userInformation, twoFAEnabled } from "../../dataVars/atoms";
import { useRecoilState } from 'recoil';

function Login() {
  const [userData, setprofileData] = useRecoilState(userInformation);
  const [tfaEnabled, settwofaEnabled] = useRecoilState(twoFAEnabled);

  const link = `http://localhost:3000/auth`

  return (
    <div className="login">
      <img className="disk" src={DiskImage} alt="Diskette Illustration" />
      <img className="logo" src={LogoImage} alt="Logo Pong" />
      <p className="slogan">Play Old Nice Games</p>
      <Button
        className="button"
        onClick={() => {
						window.open(`${process.env.AUTH42_LINK}`, '_self')}}
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
