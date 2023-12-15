import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    findAll(paginationQuery: any): Promise<import("./entities/cats.entity").Cat[]>;
    findOne(id: string): Promise<import("./entities/cats.entity").Cat>;
    create(createCatDto: CreateCatDto): Promise<import("./entities/cats.entity").Cat>;
    update(id: string, updateCatDto: UpdateCatDto): Promise<import("./entities/cats.entity").Cat>;
    remove(id: string): Promise<import("./entities/cats.entity").Cat>;
}
