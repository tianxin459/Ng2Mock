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


export function MockFactory(backend, options): Http { return new Http(backend, options); }

// dev NgModel
let devModel = {
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
      useFactory: MockFactory
    }
  ],
  bootstrap: [AppComponent]
};

// prod ngModel
let prodModel = {
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
    { provide: MockService, useValue: {} },
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
};

export function ngModuleDeclaration(): any {
  return environment.production ? prodModel : devModel;
}

@NgModule(ngModuleDeclaration())
export class AppModule {
  constructor(private mock: MockService) {
  }
}
