import { Subject } from 'rxjs/Rx';
import { ok } from 'assert';
import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, RequestMethod, XHRBackend, BaseRequestOptions, RequestOptions,HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AppService } from './app.service';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportComponent } from './support/support.component';
import { ResultComponent } from './result/result.component';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';

@Injectable()
export class MockService {

  constructor(private app: AppService,
    private mock: MockBackend,
    private realBackend: XHRBackend,
    private options: BaseRequestOptions) {
    this.MockServiceResponse();
  }


  MockServiceResponse() {
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
          console.log('get cust');
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

let ConfigAppModule = () => {
  return {
      declarations: [
        AppComponent,
        SupportComponent,
        ResultComponent
      ],
      imports: [
        appRouting,
        BrowserModule,
        FormsModule,
        HttpModule
      ],
      providers: [
        AppService,
        MockService,
        BaseRequestOptions,
        { provide: APP_BASE_HREF, useValue: '/' },
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => { return new Http(backend, options); }
        }
      ]
    };
};


export { ConfigAppModule }
