
import * as Disk from '../../images/disk.png';
import * as Logo from '../../images/PONG-logo.png';
import './HomeDisplay.css';
import { Link } from "react-router-dom";

function HomeDisplay() {

  return (
    <>
      <div className='home'>
        <img className='disk' src={Disk.default} alt="Disquete Illustration" />
        <img className='logo' src={Logo.default} alt="Logo Pong" />
        <div className="play-button">
          <Link className="slogan"style={{
              fontSize: "4vw",
              color: "white"
              }}
              to="/Play"
          > PLAY </Link>
				</div>
      </div>
    </>
  );
};

export default HomeDisplay;