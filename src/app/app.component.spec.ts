/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SupportComponent } from './support/support.component';
import { AppService } from './app.service';
import { MockService } from './mock.service';
import { ResultComponent } from './result/result.component';
import { Routes, RouterModule } from '@angular/router';

import { appRouting } from './app.routing';

let configApp = (): any => {
  return {
    declarations: [
      AppComponent
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
    imports: [
      RouterTestingModule
    ]
  };
};

xdescribe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(configApp());
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    console.log(configApp());
  }));

  xit(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  xit('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
