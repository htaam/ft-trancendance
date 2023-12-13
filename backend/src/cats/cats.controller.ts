import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
	constructor( private readonly catsService: CatsService) {}

	@Get()
	findAll(@Query() paginationQuery) {
		//return 'This action returns all cats';
		return this.catsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		//return `This action returns #${id} cat`;
		return this.catsService.findOne(id);
	}

	@Post()
	create(@Body() createCatDto: CreateCatDto) {
		//return body;
		return this.catsService.create(createCatDto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
		return this.catsService.update(id, updateCatDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		//return `This action removes #${id} cat`;
		return this.catsService.remove(id);
	}
}
