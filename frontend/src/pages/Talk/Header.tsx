import { User } from '../../../../shared/interfaces/talk.interface';
import "./Talk.css";

export const Header = ({
  user,
  isConnected,
}: {
  user: User;
  isConnected: boolean;
}) => {
  return (
    <div className='talk-header'>
      <h1>Chat</h1>
      
      <div className='flex'>
        <span>{user.userName ?? ''}</span>
        <span>{isConnected ? '🟢' : '🔴'}</span>
      </div>
    </div>
  );
};