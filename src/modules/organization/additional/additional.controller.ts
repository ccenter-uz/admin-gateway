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
import { AdditionalService } from './additional.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto } from 'types/global';
import {
  AdditionalCreateDto,
  AdditionalInterfaces,
  AdditionalUpdateDto,
} from 'types/organization/additional';
import { AdditionalFilterDto } from 'types/organization/additional/dto/filter-additional.dto';

@ApiBearerAuth()
@ApiTags('additional')
@Controller('additional')
export class AdditionalController {
  constructor(private readonly additionalService: AdditionalService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: AdditionalFilterDto
  ): Promise<AdditionalInterfaces.Response[]> {
    return await this.additionalService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<AdditionalInterfaces.Response> {
    return this.additionalService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: AdditionalCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AdditionalCreateDto,
    @Req() request: Request
  ): Promise<AdditionalInterfaces.Response> {
    return this.additionalService.create(
      data,
      request.body['userData'].user.numericId
    );
  }

  @Put(':id')
  @ApiBody({ type: AdditionalUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AdditionalUpdateDto, 'id'>
  ): Promise<AdditionalInterfaces.Response> {
    return this.additionalService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<AdditionalInterfaces.Response> {
    return this.additionalService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AdditionalInterfaces.Response> {
    return this.additionalService.restore({ id });
  }
}