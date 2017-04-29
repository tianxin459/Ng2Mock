import { Subject } from 'rxjs/Rx';
import { ok } from 'assert';
import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, RequestMethod, XHRBackend, BaseRequestOptions, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AppService } from './app.service';

@Injectable()
export class MockService {

  constructor(private app: AppService,
    private mock: MockBackend,
    private realBackend: XHRBackend,
    private options: BaseRequestOptions) {
    this.MockService();
  }

  MockService() {
    let ro = new ResponseOptions();
    this.mock.connections.subscribe(c => {
      switch (c.request.url) {
        case this.app.get_url1:
          ro.body = { test: 'mockservice' };
          ro.status = 200;
          c.mockRespond(new Response(ro));
          break;
        case this.app.post_createCase:
          let req = c.request.json();

          if (/^bad@.+/.test(req.EmailAddress)) {
            ro.body = {
              Success: false,
              ResponseCode: '001',
              ResponseText: 'ResponseText'
            };
            ro.status = 200;
            c.mockRespond(new Response(ro));
          } else if (/^badservice@.+/.test(req.EmailAddress)) {
            // for badservice@...... return system error
            ro.body = {
              Success: false
            };
            ro.status = 500;
            c.mockError(new Response(ro));
          } else {
            ro.body = {
              Success: true,
              ResponseCode: '',
              ResponseText: ''
            };
            ro.status = 200;
            c.mockRespond(new Response(ro));
          }
          break;
        case this.app.get_customerInfo:
          ro.body = {
            Success: true,
            FirstName: 'firstname',
            LastName: 'lastname',
            EmailAddress: 'someone@somewhere.com',
            PhoneNumber: '6263334444'
          };
          ro.status = 200;
          c.mockRespond(new Response(ro));
          break;
        default:
          let realHttp = new Http(this.realBackend, this.options);
          let requestOptions = new RequestOptions({
            method: c.request.method,
            headers: c.request.headers,
            body: c.request.getBody(),
            url: c.request.url,
            withCredentials: c.request.withCredentials,
            responseType: c.request.responseType
          });
          realHttp.request(c.request.url, requestOptions)
            .subscribe((response: Response) => {
              c.mockRespond(response);
            },
            (error: any) => {
              c.mockError(error);
            });
          break;
      }
    });
  }
}
