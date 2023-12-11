import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';

@Controller('cats')
export class CatsController {
	@Get()
	findAll() {
		return 'This action returns all cats';
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return `This action returns #${id} cat`;
	}

	@Post()
	create(@Body('name') body) { 
		return body;
	}

	@Patch(':id')
	update(@Param('id') id: String, @Body() body) {
		return `This action updates #${id} cat`;
	}

	@Delete(':id')
	remove(@Param('id') id: String) {
		return `This action removes #${id} cat`;
	}
}
