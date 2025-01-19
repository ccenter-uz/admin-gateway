import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AdditionalCategoryService } from './additional-category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto } from 'types/global';
import {
  AdditionalCategoryCreateDto,
  AdditionalCategoryInterfaces,
  AdditionalCategoryUpdateDto,
} from 'types/organization/additional-category';
import { AdditionalCategoryFilterDto } from 'types/organization/additional-category/dto/filter-additional-category.dto';

@ApiBearerAuth()
@ApiTags('additional-category')
@Controller('additional-category')
export class AdditionalCategoryController {
  constructor(
    private readonly additionalCategoryService: AdditionalCategoryService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: AdditionalCategoryFilterDto
  ): Promise<AdditionalCategoryInterfaces.Response[]> {
    return await this.additionalCategoryService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<AdditionalCategoryInterfaces.Response> {
    return this.additionalCategoryService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: AdditionalCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AdditionalCategoryCreateDto,
    @Req() request: Request
  ): Promise<AdditionalCategoryInterfaces.Response> {
    return this.additionalCategoryService.create(
      data,
      request.body['userData'].user.numericId
    );
  }

  @Put(':id')
  @ApiBody({ type: AdditionalCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AdditionalCategoryUpdateDto, 'id'>
  ): Promise<AdditionalCategoryInterfaces.Response> {
    return this.additionalCategoryService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<AdditionalCategoryInterfaces.Response> {
    return this.additionalCategoryService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AdditionalCategoryInterfaces.Response> {
    return this.additionalCategoryService.restore({ id });
  }
}