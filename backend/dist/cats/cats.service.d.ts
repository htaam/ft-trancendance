import { Cat } from './entities/cats.entity';
export declare class CatsService {
    private cats;
    findAll(): Cat[];
    findOne(id: string): Cat;
    create(createCatsDto: any): void;
    update(id: string, updateCatsDto: any): void;
    remove(id: string): void;
}
