import { Injectable } from '@angular/core';
import { AuthorizationService} from './authorization.service';
import {Http, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  regUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/register';
  projUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/createproject';
  getAllProjectsUrl = ' https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/getprojects';
  postResult: any = {};


  constructor(private http: Http, private auth: AuthorizationService) { }

  register(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.regUrl, payload, { headers: headers })  // а
      .subscribe(
      response => {
        console.log(response);
        this.postResult = response; // .json();  // а
      },
      error => {
        console.log(error);
      }
    );

  }

  createProject(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.projUrl, payload, { headers: headers })  // а
    .subscribe(
      response => {
        console.log(response);
        this.postResult = response; // .json();  // а
      },
      error => {
        console.log(error);
      }
    );
  }

  getExistingProjectsOfCurrentUser() {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.get(this.getAllProjectsUrl, { headers: headers })  // а
    .subscribe(
      response => {
        console.log(response.json());
        this.postResult = response.json(); // .json();  // а
      },
      error => {
        console.log(error);
      }
    );
  }

  getResult() {
    return this.postResult;
  }

}
