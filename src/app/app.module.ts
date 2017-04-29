import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { MockBackend } from '@angular/http/testing';
import { Com1Component } from './com1/com1.component';
import { AppService } from './app.service';
import { MockService } from './mock.service';
import { ResultComponent } from './result/result.component';
import { Routes, RouterModule } from '@angular/router';

import { appRouting } from './app.routing';

import { environment } from '../environments/environment';


@NgModule({
    declarations: [
      AppComponent,
      Com1Component,
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
  })
  export class AppModule {
    constructor(private mock: MockService) {
      console.log('mock service ...');
    }
  }
