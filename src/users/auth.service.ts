import { UsersService } from './users.service';
import { Injectable } from "@nestjs/common";

export class AuthService{
    constructor(private userService: UsersService){}
}