import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    findAll(paginationQuery: any): import("./entities/cats.entity").Cat[];
    findOne(id: string): import("./entities/cats.entity").Cat;
    create(createCatDto: CreateCatDto): void;
    update(id: string, updateCatDto: UpdateCatDto): void;
    remove(id: string): void;
}
