import { useEffect, useState } from "react";
import "./ChatBox.css";
import ChannelButtons from "./ChannelButtons/ChannelButtons";
import SendDiv from "./MessageBox/sendDiv/SendDiv";
import MessageBox from "./MessageBox/MessageBox";
import NewChannelPopUp from "./NewChannelPopUp/NewChannelPopUp";
import { useRecoilValue } from "recoil";
import { selectedChannelAtom } from "../../dataVars/atoms";

function ChatBox() {
  const currentUser = "amaria-m";
  const [popUp, setPopUp] = useState(0);
  const selectedChannel = useRecoilValue(selectedChannelAtom);

  useEffect(() => {
    return () => void console.log("recycling chatBox");
  }, []);

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div
            className="newChannelButton"
            onClick={() => {
              setPopUp(1);
            }}
          >
            New Conversation
          </div>
          <ChannelButtons currentUser={currentUser} />
        </div>
        {selectedChannel != "" && (
          <div className="chatDisplay">
            <MessageBox currentUser={currentUser} />
            <SendDiv id="sendText" currentUser={currentUser} />
          </div>
        )}
      </div>
      {popUp && <NewChannelPopUp popUp={setPopUp} currentUser={currentUser} />}
    </>
  );
}

export default ChatBox;
