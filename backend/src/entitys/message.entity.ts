import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user.entity';
import Channel from './channel.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @ManyToOne((type) => User, (user) => user.id)
  sender: User;

  @Column()
  content: string;

  @ManyToOne(() => Channel, (channel) => channel.history)
  channel: Channel;
}

export default Message;
