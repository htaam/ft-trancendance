import { useRecoilState } from "recoil";
import "./FriendsList.css";
import { allUsersAtom, userFriendsAtom } from "../../../../dataVars/atoms";
import { useEffect, useState } from "react";
import {
  addFriend,
  getAllUsers,
  getUserFriends,
  removeFriend,
} from "../../../../dataVars/serverRequests";
import { IUser } from "../../../../dataVars/types";

interface Props {
  currentUser: string;
}

export default function FriendsList({ currentUser }: Props) {
  const [users, setUsers] = useRecoilState(allUsersAtom);
  const [friends, setFriends] = useRecoilState(userFriendsAtom);
  const [render, setRender] = useState(0);

  useEffect(() => {
    getUserFriends(currentUser).then((value) => {
      setFriends(value);
    });
    getAllUsers().then((value) => {
      setUsers(value);
    });
    return () => void console.log("recycling");
  }, [render]);

  return (
    <div className="mainTitle3">
      <div className="titleFriends">all users</div>
      <div className="friendsBox">
        {users.map((user: IUser) => {
          let isFriend = 0;
          friends.map((userName: string) => {
            if (userName == user.userName) isFriend = 1;
          });
          if (user.userName != currentUser)
            return (
              <div key={user.id} className="friendCard">
                <div className="friendName">{user.userName}</div>
                {isFriend == 0 && (
                  <div
                    className="friendRmv"
                    onClick={() => {
                      addFriend(user.userName, currentUser).then((value) => {
                        setFriends(value);
                        setRender(1);
                      });
                    }}
                  >
                    add
                  </div>
                )}
                {isFriend == 1 && (
                  <div
                    className="friendAdd"
                    onClick={() => {
                      removeFriend(user.userName, currentUser).then((value) => {
                        setFriends(value);
                        setRender(2);
                      });
                    }}
                  >
                    remove
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </div>
  );
}
