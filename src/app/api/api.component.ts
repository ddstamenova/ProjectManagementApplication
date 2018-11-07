import { Component, OnInit } from '@angular/core';
import { AuthorizationService} from '../authorization.service';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})



export class ApiComponent implements OnInit {

  postUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/register';
  postResult: any = {};
  payload: any = {userId: '5', fname: 'dess', lname: 'stamenova', email: 'stam@example.com'};

  data: any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {

    // get user; stop if null
    const authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
    }

    authenticatedUser.getSession( (err, session) => {

      if (err) {
        console.log(err);
        return;
      }

      const token = session.getIdToken().getJwtToken();
      const headers = new Headers();
      headers.append('Authorization', token);

      this.auth.getAuthenticatedUser().getSession((err0, session0) => {
        if (err0) {
          console.log(err0);
          return;
        }

        // tslint:disable-next-line:no-shadowed-variable
        const token = session0.getIdToken().getJwtToken();
        // tslint:disable-next-line:no-shadowed-variable
        const headers = new Headers();
        headers.append('Authorization', token);

        this.http.get('https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/testdata', { headers: headers })
          .subscribe(
          response => {
            console.log(response);
            this.data = response.json();
          },
          error => {
            console.log(error);
          }
        );
      });
    });
  }


}
