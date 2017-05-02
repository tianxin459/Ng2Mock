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

xdescribe('MockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(ConfigAppModule());
  });

  it('should ...', inject([MockService], (service: MockService) => {
      expect(service).toBeTruthy();
    }));
});
