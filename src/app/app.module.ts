import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { MockBackend } from '@angular/http/testing';
import { SupportComponent } from './support/support.component';
import { AppService } from './app.service';
import { MockService } from './mock.service';
import { ResultComponent } from './result/result.component';
import { Routes, RouterModule } from '@angular/router';

import { appRouting } from './app.routing';

import { environment } from '../environments/environment';




let BuildNgModel = () => {
  let ngModel = {};
  if (environment.production) {
    ngModel = {
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
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => { return new Http(backend, options); }
        }
      ],
      bootstrap: [AppComponent]
    };
  } else {
    ngModel = {
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
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => { return new Http(backend, options); }
        }
      ],
      bootstrap: [AppComponent]
    };
  }

  return ngModel;
};


@NgModule(BuildNgModel())
export class AppModule {
  constructor(private mock: MockService) {
    console.log('mock service ...');
  }
}
