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
  isAdmin = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCurrentUserDetails();
    console.log(this.api.isAdmin());
    this.isAdmin = this.api.isAdmin();
  }

  // press button to assing a role to another user
  assignRoleRequest() {
    this.assignRole = true;
    this.editDetails = false;
    this.viewDetails = false;
  }

  userListRequest() {
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
    this.assignRole = false;
    this.editDetails = true;
    this.viewDetails = false;
    this.userList = false;
  }

  update() {
    window.location.reload();
  }

  updateUserDetailsRequest(form: NgForm) {
    // const a = this.api.getCurrentUserEmail();
    // console.log(a);
    this.payload = { fname: form.value.fname, lname: form.value.lname, email: this.api.getCurrentUserEmail(),
      udescription: form.value.udescription, skills: form.value.skills, role: ' '};
    console.log(this.payload);
    this.api.updateUserDetails(this.payload);
  }

  assignRoleApiRequest(form: NgForm) {
    this.payload = { email: form.value.assigneduser, role: form.value.role};
    console.log(this.payload);
    this.api.assignRole(this.payload);
  }

}
