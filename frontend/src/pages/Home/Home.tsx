import HomeDisplay from "../../components/HomeDisplay/HomeDisplay";
import Sidebar from "../../components/Sidebar/Sidebar";

export const Home = () => {
  
  return (
    <div className="container-row">
      <Sidebar />
      <HomeDisplay />
    </div>
  );
};

export default Home;
