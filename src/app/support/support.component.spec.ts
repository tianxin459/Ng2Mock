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
    let app = ConfigAppModule();

    TestBed.configureTestingModule(Object.assign(app, {
      declarations: [
        SupportComponent
      ]
    }));
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', inject([AppService, MockBackend], (app: AppService, mock: MockBackend) => {
    expect(component).toBeTruthy();

    let ro = new ResponseOptions();
    mock.connections.subscribe(c => {
      switch (c.request.url) {
        case app.get_customerInfo:
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
          break;
      }
    });
    component.LoadData();
    expect(component.Success).toBeTruthy();
  }));


});
