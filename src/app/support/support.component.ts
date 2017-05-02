import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  data = 'support';
  ErrorMessage = '';
  FirstName = '';
  LastName = '';
  EmailAddress = '';
  Phone = '';
  Subject = '';
  Question = '';
  Message = '';
  Success = false;


  constructor(private http: Http,
    private app: AppService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.data = 'support data';
    this.LoadData();
  }

  LoadData() {
    this.http.get(this.app.get_customerInfo)
      .map(c => { return c.json(); })
      .subscribe(
      (data: any) => {
        if (!data.Success) {
          this.app.Message = 'unable to retrieve customer information';
          this.router.navigateByUrl('result');
          return;
        }

        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.EmailAddress = data.EmailAddress;
        this.Phone = data.PhoneNumber;
        this.Success = data.Success;
      },
      (err: any) => {
        this.app.Message = 'unable to retrieve customer information';
        this.router.navigateByUrl('result');
        console.log(`error: ${err}`);
      },
      () => { console.log('complete'); }
      );
  }

  Valid(): boolean {
    return true;
    // return !!this.EmailAddress && !!this.Subject && !!this.Question;
  }

  CreateCase(): void {

    if (!this.Valid()) {
      this.ErrorMessage = `Please fill in the required fields:
                                        ${this.EmailAddress ? '' : 'EmailAddress'}
                                        ${this.Subject ? '' : 'Topic'}
                                        ${this.Question ? '' : 'Feedback'}`;
      return;
    }
    /*create request object*/
    let request = {
      EmailAddress: this.EmailAddress,
      PhoneNumber: this.Phone,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Question: this.Question,
      Subject: this.Subject
    };

    this.http.post(this.app.post_createCase, request)
      .map(res => { return res.json(); })
      .subscribe(
      (data: any) => {
        this.app.Message = 'Success';
        this.router.navigate(['result']);
      },
      (err: any) => { console.error(err); },
      () => { }
      );
  }
}
