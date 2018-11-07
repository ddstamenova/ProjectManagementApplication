import { Injectable } from '@angular/core';
import { AuthorizationService} from './authorization.service';
import {Http, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  postUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/register';
  postResult: any = {};
  payload: any = {userId: '10', fname: 'maria', lname: 'stamenova', email: 'maria@example.com'};

  data: any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  register() {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.postUrl, this.payload, { headers: headers })  // а
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
