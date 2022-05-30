import { ExecutionContext, CallHandler, UseInterceptors, NestInterceptor } from "@nestjs/common"; 
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";


export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
       //this is going to run before the handler call is made
       console.log('1- before the handler', context);

       //this is going to run before a response is being sent back
        return next.handle().pipe(map((data: any)=>{
            console.log('3- before the response ', data);
        })
        );
    }


}