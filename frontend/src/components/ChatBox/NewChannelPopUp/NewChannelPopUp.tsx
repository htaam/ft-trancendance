import { useEffect, useState } from "react";
import "./NewChannelPopUp.css";
import NewChannelPage from "./newChannelPage/newChannelPage";
import NewPrivateMessage from "./newPrivateMessage/newPrivateMessage";
import FriendsList from "./FriendsList/FriendsList";

interface Props {
  popUp: (n: number) => void;
  currentUser: string;
}

export default function NewChannelPopUp({ popUp, currentUser }: Props) {
  const [title, setTitle] = useState("title1");

  useEffect(() => {
    return () => void console.log("recycling newChannelPopUp");
  }, []);

  return (
    <div className="bluredBackground">
      <div
        className={
          "newChannelPopUp " +
          (title == "title1" && "title1Selected") +
          " " +
          (title == "title2" && "title2Selected") +
          " " +
          (title == "title3" && "title3Selected")
        }
      >
        <div className="popUpHeader">
          <div
            className={
              "headerTitle title1 " + (title == "title2" && "title1TakePoint")
            }
            onClick={() => {
              setTitle("title1");
            }}
          >
            Private Message
          </div>
          <div
            className={
              "headerTitle title2 " +
              (title == "title1" && " title2LeftPoint ") +
              (title == "title3" && " title2RightPoint")
            }
            onClick={() => {
              setTitle("title2");
            }}
          >
            New Channel
          </div>
          <div
            className={
              "headerTitle title3 " + (title == "title2" && "title3TakePoint")
            }
            onClick={() => {
              setTitle("title3");
            }}
          >
            Friends
          </div>
        </div>
        {title == "title1" && <NewPrivateMessage currentUser={currentUser} />}
        {title == "title2" && (
          <NewChannelPage currentUser={currentUser} closePopUp={popUp} />
        )}
        {title == "title3" && <FriendsList currentUser={currentUser} />}
        <div
          className="cancelButton"
          onClick={() => {
            popUp(0);
          }}
        >
          CANCEL
        </div>
      </div>
    </div>
  );
}
