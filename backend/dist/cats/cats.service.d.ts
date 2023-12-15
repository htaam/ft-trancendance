import { Repository } from 'typeorm';
import { Cat } from './entities/cats.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
export declare class CatsService {
    private readonly catRepository;
    constructor(catRepository: Repository<Cat>);
    findAll(): Promise<Cat[]>;
    findOne(id: string): Promise<Cat>;
    create(createCatDto: CreateCatDto): Promise<Cat>;
    update(id: string, updateCatDto: UpdateCatDto): Promise<Cat>;
    remove(id: string): Promise<Cat>;
}
