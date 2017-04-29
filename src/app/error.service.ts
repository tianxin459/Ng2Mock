import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  errorMessage: string;

  ClearErrorMessage() { this.errorMessage = ''; };

  SetErrorMessage(message: string) { this.errorMessage = message; };
  GetErrorMessage() { return this.errorMessage; };

  constructor() { }

}
