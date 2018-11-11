import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  editDetails = false;
  viewDetails = false;
  assignRole = false;
  userList = false;

  payload: any = {};
  results: any = {};
  userListResult: any = {};
  isAdmin = false;

  constructor(private api: ApiService) { }

  // load first 10 users + current user's details
  ngOnInit() {
    this.api.getCurrentUserDetails();
    this.api.getAllUsers();
    console.log(this.api.isAdmin());
    this.isAdmin = this.api.isAdmin();
  }

  // press button to assing a role to another user
  assignRoleRequest() {
    this.assignRole = true;
    this.editDetails = false;
    this.viewDetails = false;
  }

  // button trigger
  userListRequest() {
    this.userListResult = this.api.getAllUsersResult();
    console.log(this.userListResult);
    this.userList = true;
    this.editDetails = false;
    this.viewDetails = false;
  }

  // press button view details
  viewDetailsRequest() {
    this.results = this.api.getUserDetailsResult();
    this.viewDetails = true;
    this.editDetails = false;
    this.assignRole = false;
    this.userList = false;
  }

  // press button edit details
  editDetailsRequest() {
    this.results = this.api.getUserDetailsResult();
    console.log(this.results);
    this.assignRole = false;
    this.editDetails = true;
    this.userList = false;
  }

  // refresh window
  update() {
    window.location.reload();
  }

  // updating user details
  updateUserDetailsRequest(form: NgForm) {
    this.payload = { fname: form.value.fname, lname: form.value.lname, email: this.api.getCurrentUserEmail(),
      udescription: form.value.udescription, skills: form.value.skills, userrole: 'none'};
    this.api.updateUserDetails(this.payload);
  }

  // *only for admin* assign role to an existing user
  assignRoleApiRequest(form: NgForm) {
    this.payload = { email: form.value.assigneduser, role: form.value.role};
    this.api.assignRole(this.payload);
  }

}
