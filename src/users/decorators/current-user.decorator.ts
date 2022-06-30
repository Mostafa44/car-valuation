import{
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common'
//context is  a wrapping around the incosming request
//it is called context , so that it can be used with different protoclos
//like http , graphQl, GRPC,...etc
//but effectively it is the incoming request
export const CurrentUser= createParamDecorator(
    (data:never, context: ExecutionContext)=>{
        const request= context.switchToHttp().getRequest();
        console.log(request.session.userId);
        return 'hi there';
    }
)