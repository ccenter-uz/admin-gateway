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
import { MainOrganizationService } from './main-organization.service';
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
  MainOrganizationCreateDto,
  MainOrganizationInterfaces,
  MainOrganizationUpdateDto,
} from 'types/organization/main-organization';

@ApiBearerAuth()
@ApiTags('main-organization')
@Controller('main-organization')
export class MainOrganizationController {
  constructor(
    private readonly mainOrganizationService: MainOrganizationService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<MainOrganizationInterfaces.Response[]> {
    return await this.mainOrganizationService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: MainOrganizationCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: MainOrganizationCreateDto
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: MainOrganizationUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<MainOrganizationUpdateDto, 'id'>
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete', ParseBoolPipe) deleteQuery?: boolean
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.restore({ id });
  }
}
