import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Play from "./pages/Play/Play";
import Chat from "./pages/Chat/Chat";
import Profile from "./pages/Profile/Profile";
import LeaderBoard from "./pages/Leaderboard/Leaderboard";
import RetLogin from "./pages/Auth/retLogin";
import TwoAuth from "./pages/Auth/TwoAuth.tsx";
import Registration from "./components/Registration/Registration";
import { chatSocket, game_socket, mySocket } from "./dataVars/socket";
import { RecoilRoot, useRecoilState } from "recoil";
import { twoFAEnabled, userInformation, inviterUser, userStatus } from "./dataVars/atoms.tsx";
import { useEffect } from "react";
import { getUserInfo } from "./pages/auth.api.ts";
export const socket = new mySocket();
export default function App() {
  const [userstatus, setStatus] = useRecoilState(userStatus);
  const [tfaEnabled, settwofaEnabled] = useRecoilState(twoFAEnabled);
  const [userData, setprofileData] = useRecoilState(userInformation);
  const [inviter, setInviter] = useRecoilState(inviterUser);


  useEffect(() => {

    // chatSocket
    retrieveToken();

    // retrieveProfile();
  }, [userstatus]);

  useEffect(() => {
    chatSocket.on("muteNotification", (data) => {
      /*muted_user_alert("You're  muted till " + data.duration)*/
    });
    return () => { chatSocket.off("muteNotification") };

  }, [chatSocket])

  const retrieveToken = () => {

    getUserInfo()
      .then((response: any) => {
        setprofileData({ ...userData, ...response.data })
        setStatus(false);
        chatSocket;
        game_socket;
      })
      .catch((e: Error) => {
        console.log(`error === > ${e}`);
        setStatus(true);
      });
  };

  return (
    <div className="App" id="main">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Play" element={<Play />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Leaderboard" element={<LeaderBoard />} />
            <Route path="/Reg" element={<Registration />} />
            <Route path="/RetLogin" element={<RetLogin />} />
            <Route path="/TwoAuth" element={<TwoAuth />} />
          </Routes>
        </Router>
    </div>
  );
}