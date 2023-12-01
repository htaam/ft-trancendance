import User from './user.entity';
import Message from './message.entity';
declare class Channel {
    id: string;
    displayName: string;
    type: 'personal' | 'private' | 'public';
    avatar: string;
    members: User[];
    creator: string;
    admins: string[];
    blocked: string[];
    history: Message[];
}
export default Channel;
