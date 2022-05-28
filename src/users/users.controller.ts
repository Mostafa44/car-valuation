import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import {Post, Body , Controller } from '@nestjs/common';
import { bindCallback } from 'rxjs';

@Controller('auth')
export class UsersController {

    private usersService: UsersService;

    constructor(usersService: UsersService){
        this.usersService= usersService;
    }

    @Post("/signup")
    createUser(@Body() body:CreateUserDto){
        this.usersService.create(body.email, body.password);
    }

}
