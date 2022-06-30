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
    Session,
    } from '@nestjs/common';
import { Serialize } from './../interceptors/serializer.interceptior';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    private usersService: UsersService;
    private authService: AuthService;

    constructor(usersService: UsersService, authService: AuthService){
        this.usersService= usersService;
        this.authService= authService;
    }
    //Examples of setting and getting session variables

    @Get("/colors/:color")
    setColor(@Param('color') color: string, @Session() session:any){
        session.color= color;
    }

    @Get("/colors")
    getColor(@Session() session:any ){
        return session.color;
    }
//=====================
    // @Get("whoami")
    // whoAmI(@Session() session:any){
    //     return this.usersService.findOne(session.userId);

    // }
    @Get('/whoami')
    whoAmI(@CurrentUser() user: string){
            return user;
    }

    @Post("/signup")
    async createUser(@Body() body:CreateUserDto, @Session() session:any){
       const user = await this.authService.signup(body.email, body.password);
        session.userId= user.id;
        return user;
    }

    @Post("/signin")
    async signin(@Body() body:CreateUserDto, @Session() session:any){
       const user= await this.authService.signin(body.email, body.password);
       session.userId= user.id;
       return user;
    }

    @Post("/signout")
    signout(@Session() session:any){
        session.userId= null;
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
