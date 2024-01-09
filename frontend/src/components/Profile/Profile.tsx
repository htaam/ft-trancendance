// components/Profile/Profile.tsx

import React from 'react';
import * as iheart from "../../images/heart.png";
import * as idrop from "../../images/drop.png";
import * as imedal from "../../images/medal.png";
import './Profile.css';

interface ProfileProps {
  userName: string;
  gameWin: number;
  gameLose: number;
  winStreak: number;
  avatar: string; // Add the avatar prop
}

const Profile: React.FC<ProfileProps> = ({ userName, gameWin, gameLose, winStreak, avatar }) => {
  return (
    <div className="container-profile">
      <div className='frame'>
        <img className="profile-img" src={avatar} alt="Profile image" />
        <h2 className="nickname">{userName}</h2>
        <div className="icons-row">
          <div className='item'>
            <img className="icon-img" src={iheart.default} alt="Heart icon" />
            <span className='win'>{gameWin}</span>
          </div>
          <div className='item'>
            <img className="icon-img" src={idrop.default} alt="Drop icon" />
            <span className='lose'>{gameLose}</span>
          </div>
          <div className='item'>
            <img className="icon-img" src={imedal.default} alt="Medal icon" />
            <span className='wins'>{winStreak}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
