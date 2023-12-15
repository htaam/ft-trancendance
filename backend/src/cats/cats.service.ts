import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cats.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private readonly catRepository: Repository<Cat>,
    ) {}

    findAll() {
        return this.catRepository.find();
    }

    async findOne(id: string) {
        const cat = await this.catRepository.findOne({where: {id: Number(id)}}); // convertion for comparition
        if(!cat) {
            throw new NotFoundException(`Cat #${id} not found`);
        }
        return cat;
    }

    create(createCatDto: CreateCatDto) {
        const cat = this.catRepository.create(createCatDto);
        return this.catRepository.save(cat);
    }

    async update(id: string, updateCatDto: UpdateCatDto) {
        const cat = await this.catRepository.preload({
            id: +id,
            ...updateCatDto,
        });
        if (!cat) {
            throw new NotFoundException(`Cat #${id} not found`);
        }
        return this.catRepository.save(cat);
    }

    async remove(id: string) {
        const cat = await this.findOne(id);
        return this.catRepository.remove(cat);
    }
}
