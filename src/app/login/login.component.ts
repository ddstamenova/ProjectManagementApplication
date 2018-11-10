import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthorizationService} from '../authorization.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  emailVerificationMessage = false;
  submitted = false; // for testing

  constructor(private authorization: AuthorizationService, private router: Router, private api: ApiService) { }

  onSubmit(form: NgForm) {


    const email = form.value.email;
    const password = form.value.password;
    this.api.setCurrentUserEmail(form.value.email);

    this.authorization.signIn(email, password).subscribe((data) => {
      this.router.navigateByUrl('/projects');
    }, (err) => {
      this.emailVerificationMessage = true;
    });

    // test- wrong
    this.submitted = true;

    this.api.getCurrentUserDetails();
  }


}
