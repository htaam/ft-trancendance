import Leaderboard from "../../components/Leaderboard/Leaderboard";
import Sidebar from "../../components/Sidebar/Sidebar";

const LeaderBoard: React.FC = () => {

  return (
    <>
      <div className="container-row">
        <Sidebar />
        <Leaderboard />
      </div>
    </>
  );
};

export default LeaderBoard;
