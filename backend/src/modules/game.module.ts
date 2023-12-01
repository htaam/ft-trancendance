import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Game from 'src/entitys/game.entity';
import { GameService } from 'src/services/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameService],
  controllers: [],
  exports: [GameService],
})
export class GameModule {}
