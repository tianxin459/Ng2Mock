import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { MockBackend } from '@angular/http/testing';
import { Com1Component } from './com1/com1.component';
import { AppService } from './app.service';
import { MockService } from './mock.service';

@NgModule({
  declarations: [
    AppComponent,
    Com1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AppService,
    MockService,
    BaseRequestOptions,
    MockBackend
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(mock:MockService){
    console.log('AppModule');
  }
 }
