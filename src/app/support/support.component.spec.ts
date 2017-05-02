import { XHRBackend, ResponseOptions, BaseRequestOptions, Http, RequestOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AppService } from '../app.service';
import { SupportComponent } from './support.component';
import { AppModule } from './../app.module';
import { ConfigAppModule, MockService } from './../mock.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(ConfigAppModule());
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create SupportComponent', inject([MockService], (mock: MockService) => {
    expect(component).toBeTruthy();
  }));

  it('should LoadData()', inject([MockService], (mock: MockService) => {
    expect(component).toBeTruthy();
    expect(mock).toBeTruthy('no mock service');
    component.LoadData();
    expect(component.Success).toBeTruthy();
  }));
});
