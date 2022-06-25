import { Serialize } from './../interceptors/serializer.interceptior';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Post, 
    Body, 
    Controller, 
    Get, 
    Param,
    Query, 
    Delete,
    Patch,
    NotFoundException,
    UseInterceptors, 
    ClassSerializerInterceptor,
    } from '@nestjs/common';

import { UserDto } from 'src/users/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    private usersService: UsersService;
    private authService: AuthService;

    constructor(usersService: UsersService, authService: AuthService){
        this.usersService= usersService;
        this.authService= authService;
    }

    @Post("/signup")
    createUser(@Body() body:CreateUserDto){
       return this.authService.signup(body.email, body.password);
    }

    @Post("/signin")
    signin(@Body() body:CreateUserDto){
       return  this.authService.signin(body.email, body.password);
    }
    @Get('/:id')

    findUser(@Param('id') id: string){
        console.log('2- handling the request');
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
