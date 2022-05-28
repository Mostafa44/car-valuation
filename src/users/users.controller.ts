import { CreateUserDto } from './dtos/create-user.dto';
import {Post, Body , Controller } from '@nestjs/common';

@Controller('auth')
export class UsersController {

    @Post("/signup")
    createUser(@Body() body:CreateUserDto){
        console.log(body);
    }

}
