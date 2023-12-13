import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cats.entity';

@Injectable()
export class CatsService {
    // Pretend is our data source
    private cats: Cat[] = [
        {
            id: 1,
            name: 'Shiva',
            eyes: 'blue',
            color: ['white', 'gray', 'brown', 'black'],
        },
        {
            id: 2,
            name: 'Mizuki',
            eyes: 'green',
            color: ['black', 'dark brown', 'white'],
        },
        {
            id: 3,
            name: 'Menina',
            eyes: 'brown',
            color: ['black', 'brown', 'orange'],
        },
    ];

    findAll() {
        return this.cats;
    }

    findOne(id: string) {
        return this.cats.find(item => item.id === +id);
    }

    create(createCatsDto: any) {
        this.cats.push(createCatsDto);
    }

    update(id: string, updateCatsDto: any) {
        const existingCats = this.findOne(id);
        if (existingCats) {
            // update existing entity
        }
    }

    remove(id: string) {
        const catsIndex = this.cats.findIndex(item => item.id === +id);
        if (catsIndex >= 0) {
            this.cats.splice(catsIndex, 1);
        }
    }

}
