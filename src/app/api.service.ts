import { Injectable } from '@angular/core';
import { AuthorizationService} from './authorization.service';
import {Http, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  regUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/register';
  projUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/createproject';
  postResult: any = {};


  data: any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  register(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.regUrl, payload, { headers: headers })  // а
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

  createProject(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.projUrl, payload, { headers: headers })  // а
    .subscribe(
      response => {
        console.log('desuuuuuuuuuuuuu');
        console.log(response);
        this.postResult = response; // .json();  // а
      },
      error => {
        console.log(error);
      }
    );

    // // get user; stop if null
    // const authenticatedUser = this.auth.getAuthenticatedUser();
    // if (authenticatedUser == null) {
    //   return;
    // }

    // authenticatedUser.getSession( (err, session) => {

    //   if (err) {
    //     console.log(err);
    //     return;
    //   }

    //   const token = session.getIdToken().getJwtToken();
    //   const headers = new Headers();
    //   headers.append('Authorization', token);

    //   this.auth.getAuthenticatedUser().getSession((err0, session0) => {
    //     if (err0) {
    //       console.log(err0);
    //       return;
    //     }

    //     // tslint:disable-next-line:no-shadowed-variable
    //     const token = session0.getIdToken().getJwtToken();
    //     // tslint:disable-next-line:no-shadowed-variable
    //     const headers = new Headers();
    //     headers.append('Authorization', token);
    //     headers.set('content-type', 'application-json'); // а


    //     this.http.post(this.projUrl, payload, { headers: headers })  // а
    //     .subscribe(
    //       response => {
    //         console.log('desuuuuuuuuuuuuu');
    //         console.log(response);
    //         this.postResult = response; // .json();  // а
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    //   });
    // });


  }
}
