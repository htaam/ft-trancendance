// import React, { useState } from 'react'
import "./Leaderboard.css";

import * as leaderboard from "../../images/leaderboard-icon.png";
// import Profiles from "./Profiles";

const LeaderBoard: React.FC = () => {
  //   const [period, setPeriod] = useState(0);

  // const handleClick = (e:any ) => {
  //   setPeriod(e.target.dataset.id)
  // }

  return (
    <div className="leaderboard">
      <div className="page-header">
        <img
          className="icon"
          src={leaderboard.default}
          alt="leaderboard icon image"
        />
        <h1 className="title">Leaderboard</h1>
      </div>

      {/* <div className="time">
        <button 
          onClick={handleClick}
          data-id='7'>7 Days</button>
        <button 
          onClick={handleClick}
          data-id='30'>30 Days</button>
        <button
          onClick={handleClick}
          data-id='0'>All time</button>
      </div> */}

      {/* <Profiles DataBoard={between(DataBoard, period)}></Profiles> */}
      {/* <Profiles></Profiles> */}

      <script src="sidebar.js"></script>
    </div>
  );
};

// // Get leaderboard users by time
// function between(data: any, between: any){
//   const today = new Date();
//   const previous = new Date(today);
//   previous.setDate(previous.getDate()-(between+1)); //10-7=3

//   let filter = data.filter((val: { dt: string | number | Date; }): any =>{
//     let userDate = new Date(val.dt);
//     return previous<=userDate&&today>=userDate;
//   })

//   //sort with ascending order
//   return filter.sort((a:any , b:any) =>{
//     if (a.score === b.score) {
//       return b.score - a.score;
//     }
//     else {
//       return b.score - a.score;
//     }
//   })
// }

export default LeaderBoard;
