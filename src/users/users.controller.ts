import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Post, Body, Controller, Get, Param, Query, Delete, Patch, NotFoundException } from '@nestjs/common';
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

    @Get('/:id')
    findUser(@Param('id') id: string){
        const user= this.usersService.findOne(parseInt(id));
        if(!user ){
            throw new NotFoundException('user noy found');
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.usersService.findAll(email);
    }
    @Delete()
    removeUser(@Param('id') id: string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body: UpdateUserDto){

        return this.usersService.update(parseInt(id), body);
    }
     

}
