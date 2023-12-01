import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import * as Logo from "../../images/PONG-logo.png";
import * as Play from "../../images/play-icon.png";
import * as Leaderboard from "../../images/leaderboard-icon.png";
import * as Chat from "../../images/chat-icon.png";
import * as Profile from "../../images/perfil-icon.png";
import * as Exit from "../../images/exit-icon.png";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const changeTab = (tab: string) => {
    console.log(tab);
    setActiveTab(tab);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img className="ilogo" src={Logo.default} alt="Logo Pong" />
      </div>
      <div className="menu">
        <Link
          className={`menu-item ${activeTab === "tab1" ? "active" : ""}`}
          to="/Play"
          onClick={() => changeTab("tab1")}
        >
          <img className="iplay" src={Play.default} alt="Play icon" />
          <div className="linkDiv">PLAY</div>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab2" ? "active" : ""}`}
          to="/Leaderboard"
          onClick={() => changeTab("tab2")}
        >
          <img
            className="ileaderboard"
            src={Leaderboard.default}
            alt="Logo Pong"
          />
          <div className="linkDiv">LEADERBOARD</div>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab3" ? "active" : ""}`}
          to="/Chat"
          onClick={() => changeTab("tab3")}
        >
          <img className="ichat" src={Chat.default} alt="Chat icon" />
          <div className="linkDiv">CHAT</div>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab4" ? "active" : ""}`}
          to="/Profile"
          onClick={() => changeTab("tab4")}
        >
          <img className="iprofile" src={Profile.default} alt="Profile icon" />
          <div className="linkDiv">PROFILE</div>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab5" ? "active" : ""}`}
          to="/Home"
          onClick={() => changeTab("tab5")}
        >
          <img className="iexit" src={Exit.default} alt="Exit icon" />
          <div className="linkDiv">EXIT</div>
        </Link>
      </div>
      <script src="sidebar.js"></script>
    </div>
  );
};

export default Sidebar;
