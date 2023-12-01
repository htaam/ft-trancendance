import Game from "../../components/Game/Game";
import Sidebar from "../../components/Sidebar/Sidebar";

const Play: React.FC = () => {
  return (
    <>
      <div className="container-row">
        <Sidebar />
        <Game />
      </div>
    </>
  );
};

export default Play;
