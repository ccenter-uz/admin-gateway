import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserInterfaces } from 'types/user/user';
import { UserLogInDto } from 'types/user/user/dto/log-in-user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: UserLogInDto })
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() data: UserLogInDto
  ): Promise<UserInterfaces.LogInResponse> {
    return this.userService.logIn(data);
  }
}