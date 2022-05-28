import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
    private repo:Repository<User>

    constructor(@InjectRepository(User) repo: Repository<User>){
        this.repo= repo;
    }
    create(email:string, password: string){

        const user= this.repo.create({email, password});
        return this.repo.save(user);
    }
}
