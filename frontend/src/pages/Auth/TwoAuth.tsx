import DiskImage from "../../images/disk.png";
import LogoImage from "../../images/PONG-logo.png";
import "../Login/Login.css"


function TwoAuth() {
  return (
    <div className="login">
      <img className="disk" src={DiskImage} alt="Diskette Illustration" />
      <img className="logo" src={LogoImage} alt="Logo Pong" />
      <p className="slogan">Play Old Nice Games</p>
        <div>
            <form>
                <label>Insert Code</label>
                <div>
                  <input type="text"></input>
                  <div className="submit-button">
                    <input type="submit" value="Submit"></input>
                  </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default TwoAuth;
