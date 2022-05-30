import { ExecutionContext, CallHandler, UseInterceptors, NestInterceptor } from "@nestjs/common"; 
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";


export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto:any){ 
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
    

       //this is going to run before a response is being sent back
        return next.handle().pipe(map((data: any)=>{
           return  plainToClass(this.dto, data, {
               excludeExtraneousValues:true
           })
        })
        );
    }


}