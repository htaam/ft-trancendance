import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Play from "./pages/Play/Play";
import Chat from "./pages/Chat/Chat";
import Profile from "./pages/Profile/Profile";
import LeaderBoard from "./pages/Leaderboard/Leaderboard";
import { mySocket } from "./dataVars/socket";
import { RecoilRoot } from "recoil";

export const socket = new mySocket();

export default function App() {
  return (
    <div className="App" id="main">
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Play" element={<Play />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Leaderboard" element={<LeaderBoard />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}
