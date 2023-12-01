import Game from 'src/entitys/game.entity';
import { Repository } from 'typeorm';
export declare class GameService {
    private gameRepo;
    constructor(gameRepo: Repository<Game>);
    findById(id: string): Promise<Game>;
}
