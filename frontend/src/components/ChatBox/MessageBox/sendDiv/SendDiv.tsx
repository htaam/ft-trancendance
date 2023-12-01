import { useState } from "react";
import "./SendDiv.css";
import {
  getChannelMessages,
  sendMessage,
} from "../../../../dataVars/serverRequests";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  channelMessagesAtom,
  selectedChannelAtom,
} from "../../../../dataVars/atoms";

interface Props {
  id: string;
  currentUser: string;
}

export default function SendDiv({ id, currentUser }: Props) {
  const [message, setMessage] = useState("");
  const selectedChannel = useRecoilValue(selectedChannelAtom);
  const setMessages = useSetRecoilState(channelMessagesAtom);

  return (
    <div className="writeBox">
      <input
        id={id}
        className="sendTextInput"
        placeholder="Write..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></input>
      <button
        className="sendMessageButton"
        onClick={async () => {
          if (selectedChannel != "" && message != "") {
            const newMessage = await sendMessage(selectedChannel, currentUser, message);
						if (!newMessage) return;
            setMessages(prev => [...prev, newMessage]);
          }
        }}
      >
        Send
      </button>
    </div>
  );
}
