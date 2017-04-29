
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { MockBackend } from '@angular/http/testing';
import { SupportComponent } from './support/support.component';
import { AppService } from './app.service';
import { MockService } from './mock.service';
import { ResultComponent } from './result/result.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SupportComponent
  },
  {
    path: 'result',
    component: ResultComponent
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
