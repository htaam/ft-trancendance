import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedChannelAtom, userChatsAtom } from "../../../dataVars/atoms";
import { IChat } from "../../../dataVars/types";
import "./ChannelButtons.css";
import { getUserChannels } from "../../../dataVars/serverRequests";

interface Props {
  currentUser: string;
}

export default function ChannelButtons({ currentUser }: Props) {
  const [chats, setChats] = useRecoilState(userChatsAtom);
  const [selectedChannel, setSelectedChannel] =
    useRecoilState(selectedChannelAtom);

  useEffect(() => {
    getUserChannels(currentUser).then((value) => {
      setChats(value);
    });
    return () => void console.log("recycling channelButtons");
  }, []);

  if (chats.length > 0) {
    return (
      <div className="group-names">
        {chats.map((chat: IChat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChannel(chat.displayName);
            }}
            className={
              "groupName " +
              (selectedChannel == chat.displayName && "selectedChannelStyle")
            }
          >
            {chat.displayName}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="group-names">
        <p>No Conversations</p>
      </div>
    );
  }
}
