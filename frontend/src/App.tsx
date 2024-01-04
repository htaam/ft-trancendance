import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Play from "./pages/Play/Play";
import Profile from "./pages/Profile/Profile";
import LeaderBoard from "./pages/Leaderboard/Leaderboard";
import Callback from "./pages/Auth/callback.tsx";
import TwoAuth from "./pages/Auth/TwoAuth.tsx";
import Registration from "./components/Registration/Registration";
import { RecoilRoot } from "recoil";
import Talk from "./pages/Talk/Talk";


export default function App() {
  return (
    <div className="App" id="main">
      <RecoilRoot>
        <Router>
          {/*<AQUI VAI FICAR O CONTEXTO>*/}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Play" element={<Play />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Leaderboard" element={<LeaderBoard />} />
            <Route path="/Reg" element={<Registration />} />
            <Route path="/auth/callback" element={<Callback />} />
            <Route path="/TwoAuth" element={<TwoAuth />} />
            <Route path="/Talk" element={<Talk />} />
          </Routes>
          {/*<AQUI VAI FICAR O CONTEXTO>*/}
        </Router>
      </RecoilRoot>
    </div>
  );
}