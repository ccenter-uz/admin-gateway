import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SegmentService } from './segment.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from 'types/organization/category';
import { SegmentCreateDto, SegmentInterfaces, SegmentUpdateDto } from 'types/organization/segment';

@ApiBearerAuth()
@ApiTags('segment')
@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<SegmentInterfaces.Response[]> {
    return await this.segmentService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: SegmentCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: SegmentCreateDto
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: SegmentUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<SegmentUpdateDto, 'id'>
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete', ParseBoolPipe) deleteQuery?: boolean
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.restore({ id });
  }
}