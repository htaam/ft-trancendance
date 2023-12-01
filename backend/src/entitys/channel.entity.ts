import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import User from './user.entity';
import Message from './message.entity';

@Entity()
class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  displayName: string;

  @Column()
  type: 'personal' | 'private' | 'public';

  @Column()
  avatar: string;

  @ManyToMany(() => User, (user) => user.channels)
  members: User[];

  @Column()
  creator: string;

  @Column({ type: String, array: true })
  admins: string[];

  @Column({ type: String, array: true })
  blocked: string[];

  @OneToMany(() => Message, (message) => message.channel)
  history: Message[];
}

export default Channel;
