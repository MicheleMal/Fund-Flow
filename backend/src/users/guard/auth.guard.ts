import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService){}


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(req)
        

    if(!token){
      throw new UnauthorizedException("token nullo")
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      )
     req.user = payload
    } catch (error) {
      if(error.name == "TokenExpiredError"){
        throw new UnauthorizedException("Token scaduto")
      }
      throw new UnauthorizedException("token non valido")
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined{
    const authHeader = request.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]    

    return token
  }

}