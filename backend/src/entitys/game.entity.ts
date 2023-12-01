import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity()
class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  player1: User;

  @Column()
  player2: User;
}

export default Game;
