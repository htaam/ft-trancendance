import Profile from "../../components/Profile/Profile";
import Sidebar from "../../components/Sidebar/Sidebar";
import Achievments from "../../components/Profile/Achievments";

const _Profile: React.FC = () => {

  return (
    <>
      <div className="container-row">
        <Sidebar />
        <div className="container-col">
          <Profile />
          <Achievments />
        </div>
      </div>
    </>
  );
};

export default _Profile;
