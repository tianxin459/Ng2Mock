/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigAppModule, MockService } from './mock.service';
import { APP_BASE_HREF } from '@angular/common';

import { Subject } from 'rxjs/Rx';
import { ok } from 'assert';
import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, ResponseOptions, RequestMethod, XHRBackend, BaseRequestOptions, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AppService } from './app.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupportComponent } from './support/support.component';
import { ResultComponent } from './result/result.component';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';

describe('MockService', () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [AppService,
  //           MockBackend,
  //       {
  //         provide: Http,
  //         deps: [MockBackend, BaseRequestOptions],
  //         useFactory: (backend, options) => { return new Http(backend, options); }
  //       }
  //     , XHRBackend, BrowserXhr, BaseRequestOptions, MockService]
  //   });
  // });

  beforeEach(() => {
    let app = ConfigAppModule();

    TestBed.configureTestingModule({
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
    });
  });

  it('should ...', inject([MockService],
    (service: MockService) => {
      expect(service).toBeTruthy();
    }));
});
