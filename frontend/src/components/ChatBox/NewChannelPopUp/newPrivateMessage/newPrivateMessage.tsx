import "./newPrivateMessage.css";

interface Props {
  currentUser: string;
}

export default function NewPrivateMessage({ currentUser }: Props) {
  return (
    <div className="mainTitle1">
      <input className="inputMain" placeholder="Search"></input>
      <div className="userToSpeak"></div>
      <button className="inputMain createConversationButton" onClick={() => {}}>
        <div>New Conversation</div>
      </button>
    </div>
  );
}
