import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInformation(): {} {
    return {
      name: "Fund FLow API",
      documentation: "" //? Inserire link postman 
    }
  }
}
