import { Component, Injectable } from '@angular/core';
import { Http,Response,ResponseOptions } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
import {AppService} from './app.service';
import {MockService} from './mock.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app comp';
  url = 'http://localhost/EFApi/api/table1';
  constructor(private http: Http,private app:AppService) {
    this.title = "http get app";
  };


}
