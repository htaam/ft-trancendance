import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Game from 'src/entitys/game.entity';
import { Repository } from 'typeorm';

Injectable();
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepo: Repository<Game>,
  ) {}

  async findById(id: string) {
    const game: Game = await this.gameRepo.findOneBy({ id });
    if (game) {
      return game;
    }
    throw new HttpException(
      'Game Id provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }
}
