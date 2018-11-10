import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthorizationService} from '../authorization.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  confirmCode = false;
  codeWasConfirmed = false;
  error = '';
  payload: any = {};

  constructor(private auth: AuthorizationService, private _router: Router, private api: ApiService) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.register(email, password).subscribe(
      (data) => {
        this.confirmCode = true;
        this.payload = {fname: form.value.firstname, lname: form.value.lastname, email: form.value.email};
      },
      (err) => {
        console.log(err);
        this.error = 'Registration error';
      }
    );
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;

    this.auth.confirmAuthCode(code).subscribe(
      (data) => {
        // call api function
        this.api.register(this.payload);                 // api function
        this._router.navigateByUrl('');
        this.codeWasConfirmed = true;
        this.confirmCode = false;
      },
      (err) => {
        console.log(err);
        this.error = 'Authorization error';
      });
  }
}
