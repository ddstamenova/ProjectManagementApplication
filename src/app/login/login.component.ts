import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthorizationService} from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  emailVerificationMessage = false;
  submitted = false; // for testing

  constructor(private authorization: AuthorizationService, private router: Router) { }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.authorization.signIn(email, password).subscribe((data) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.emailVerificationMessage = true;
    });

    // test- wrong
    this.submitted = true;
  }


}
