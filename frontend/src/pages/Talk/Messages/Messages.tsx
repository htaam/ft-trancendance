import { Message, User} from '../../../../../shared/interfaces/talk.interface';
import "../Talk.css";

const determineMessageStyle = (user: User, messageUserId: string) => {
  if (user && messageUserId === user.id) {
    return 'custom-box1';
  } else {
    return 'custom-box2';
  }
};

export const Messages = ({
  user,
  messages,
}: {
  user: User;
  messages: Message[];
}) => {
  return (
    <div className="message">
      {messages?.map((message, index) => {
        return (
          <div
            key={index}
            className={determineMessageStyle(user, message.sender.id)}
          >
            <span className='name'>
              {message.sender.userName}
            </span>
            <span>{' ' + '*' + ' '}</span>
            <span className='data'>{message.date}</span>
            <p className='content'>{message.content}</p>
          </div>
        );
      })}
    </div>
  );
};