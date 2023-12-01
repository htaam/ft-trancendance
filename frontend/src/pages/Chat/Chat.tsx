import ChatBox from "../../components/ChatBox/ChatBox";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Chat.css";

const Chat: React.FC = () => {
  return (
    <>
      <div className="container-row">
        <Sidebar />
        <div className="container-column">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Chat;
