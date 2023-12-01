import { useEffect, useState } from "react";
import "./newChannelPage.css";
import { useRecoilState } from "recoil";
import { userFriendsAtom } from "../../../../dataVars/atoms";
import {
  addingMembers,
  createChannel,
  getUserFriends,
} from "../../../../dataVars/serverRequests";

interface Props {
  currentUser: string;
  closePopUp: (n: number) => void;
}

export default function NewChannelPage({ currentUser, closePopUp }: Props) {
  const [friends, setFriends] = useRecoilState(userFriendsAtom);
  const [name, setName] = useState("");
  const [type, setType] = useState("public");
  const [members, setMembers] = useState([""]);

  useEffect(() => {
    getUserFriends(currentUser).then((value) => {
      setFriends(value);
    });
  }, []);

  return (
    <div className="mainTitle2">
      <input
        className="inputMain"
        id="displayName"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Type
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div
            className="dropdown-item"
            onClick={() => {
              setType("private");
            }}
          >
            Private
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              setType("public");
            }}
          >
            Public
          </div>
        </div>
      </div>
      <div className="inputMain">
        <p>Members</p>
        <div className="friends">
          {friends.map((friend: string) => {
            let isMember = 0;
            for (let i = 0; i < members.length; i++) {
              if (members[i] == friend) isMember = 1;
            }
            return (
              <div key={friend} className="friendCard">
                <div className="friendName">{friend}</div>
                {isMember == 0 && (
                  <div
                    className="friendAdd"
                    onClick={() => {
                      addingMembers("add", friend).then((value) => {
                        setMembers(value);
                      });
                    }}
                  >
                    +
                  </div>
                )}
                {isMember == 1 && (
                  <div
                    className="friendRmv"
                    onClick={() => {
                      addingMembers("rmv", friend).then((value) => {
                        setMembers(value);
                      });
                    }}
                  >
                    -
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="inputMain createChannelButton"
        onClick={() => {
          createChannel(name, type, members, currentUser);
          closePopUp(0);
        }}
      >
        <div>Create</div>
      </button>
    </div>
  );
}
