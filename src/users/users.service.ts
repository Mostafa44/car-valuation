import { IsEmail } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
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

    findOne(id: number){
        return this.repo.findOne({where: {id}});
    }

    findAll(email:string){
        return this.repo.find({where:{email}});
    }
   async  update(id: number, attrs: Partial<User>){
        const user =  await this.repo.findOne({where:{id}});
        if(! user){
            throw new NotFoundException('user was not found');
        }
        Object.assign(user, attrs);

        return this.repo.save(user);

    }
    async remove(id: number){
        const user =  await this.repo.findOne({where:{id}});
        if(! user){
            throw new NotFoundException('user was not found');
        }

        return this.repo.remove(user);
    }
}
