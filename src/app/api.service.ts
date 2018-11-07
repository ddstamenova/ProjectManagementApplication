import { Injectable } from '@angular/core';
import { AuthorizationService} from './authorization.service';
import {Http, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  postUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/register';
  postResult: any = {};


  data: any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  register(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.postUrl, payload, { headers: headers })  // а
      .subscribe(
      response => {
        console.log('desааааааааааааааааааааа');
        console.log(response);
        this.postResult = response; // .json();  // а
      },
      error => {
        console.log(error);
      }
    );

  }
}
