import {AfterInsert ,Entity, Column, PrimaryGeneratedColumn, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @AfterInsert()
    logInsert(){
        console.log('a user was inserted with an ID of ' + this.id);
    }

    @AfterUpdate()
        logUpdate(){
            console.log('User was updated that has an ID', this.id);
        }
    

    @AfterRemove()
    logRemove(){
        console.log('User was removed that has an ID', this.id);
    }
}