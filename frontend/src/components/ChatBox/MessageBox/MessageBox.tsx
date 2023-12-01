import { useRecoilState, useRecoilValue } from "recoil";
import "./MessageBox.css";
import {
  channelMessagesAtom,
  selectedChannelAtom,
} from "../../../dataVars/atoms";
import { useEffect } from "react";
import { getChannelMessages } from "../../../dataVars/serverRequests";
import { IMessage } from "../../../dataVars/types";

interface Props {
  currentUser: string;
}

export default function MessageBox({ currentUser }: Props) {
  const [messages, setMessages] = useRecoilState(channelMessagesAtom);
  const selectedChannel = useRecoilValue(selectedChannelAtom);

  useEffect(() => {
    if (selectedChannel != "") {
      getChannelMessages(selectedChannel, currentUser).then((value) => {
        setMessages(value);
      });
    }
    return () => void console.log("recycling messageBox");
  }, [selectedChannel]);

  if (messages && messages.length > 0) {
    return (
      <div className="messagesBox">
        {messages
          .slice(0)
          .reverse()
          .map((msg: IMessage) => {
            if (msg.sender.userName == currentUser) {
              return (
                <div key={msg.id} className="message sentMessage">
                  <div className="messageBuble sentBuble">{msg.content}</div>
                </div>
              );
            } else {
              return (
                <div key={msg.id} className="message receivedMessage">
                  <div className="messageBuble receivedBuble">
                    {msg.content}
                  </div>
                </div>
              );
            }
          })}
      </div>
    );
  } else {
    return (
      <div className="messagesBox">
        <p className="messageBuble">You have no messages</p>
      </div>
    );
  }
}
