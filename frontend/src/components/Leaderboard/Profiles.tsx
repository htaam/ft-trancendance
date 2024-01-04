// import "./Profiles.css";

// interface ProfilesProps {
//   DataBoard: any;
// }
// import { useEffect } from "react";
// import { IUser } from "../../dataVars/types";
// //import { getAllUsers } from "../../dataVars/serverRequests";
// import { useRecoilState } from "recoil";
// import { allUsersAtom } from "../../dataVars/atoms";

// export default function Profiles() {
//   const [users, setUsers] = useRecoilState(allUsersAtom);

//   useEffect(() => {
//     getAllUsers().then((value) => {
//       setUsers(value);
//     });
//   }, []);
//   return (
//     <>
//       {users.map((user: IUser) => (
//         <div id="profile">
//           <div className="flex" key={user.id}>
//             <div className="item">
//               <span className="rank">{1}</span>
//               <img src={user.avatar} alt="" />
//               <div className="info">
//                 <h3 className="name">{user.userName}</h3>
//                 {/* <span>{user.location}</span> */}
//               </div>
//             </div>
//             <div className="score">
//               <span>{user.gameWin} XP</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
