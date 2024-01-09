// pages/Profile/Profile.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from "../../components/Profile/Profile";
import Sidebar from "../../components/Sidebar/Sidebar";
import Achievments from "../../components/Profile/Achievments";

const _Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user');
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        } else {
          console.error('No user data found in the response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="container-row">
        <Sidebar />
        <div className="container-col">
          <Profile
            userName={userData.userName}
            gameWin={userData.gameWin}
            gameLose={userData.gameLose}
            winStreak={userData.winStreak}
            avatar={`http://localhost:4000${userData.avatar}`} // Update with the correct property name
          />
          <Achievments />
        </div>
      </div>
    </>
  );
};

export default _Profile;
