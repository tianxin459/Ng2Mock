import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  public get_url1 = 'http://localhost/EFApi/api/table1';
  public get_customerInfo = 'http://localhost/EFApi/api/GetCustomer';
  public post_createCase = 'http://localhost/EFApi/api/createCase';
  constructor() {
    console.log('app service start');
   }

}
