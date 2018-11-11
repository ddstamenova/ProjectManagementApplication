import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchUserRequest = false;
  searchProjectRequest = false;
  searchStatusRequest = false;

  searchActiveStatusRequest = false;
  searchCompleteStatusRequest = false;

  viewSearchUserResultRequest = false;
  viewSearchProjectResultRequest = false;

  seeUserResultsRequest = false;
  seeProjectResultsRequest = false;

  payload: any = {};
  allProjectsResult: any = [];
  activeProjects: any = [];
  completedProjects: any = [];

  searchUserResult: any = {};
  searchProjectResult: any = {};

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllProjects();
  }

  requestSearchUsers() {
    this.seeUserResultsRequest = false;
    this.searchStatusRequest = false;
    this.searchUserRequest = true;
    this.searchProjectRequest = false;
    this.searchActiveStatusRequest = false;
    this.searchCompleteStatusRequest = false;

  }

  requestSearchProject() {
    this.seeUserResultsRequest = false;

    this.searchStatusRequest = false;
    this.searchUserRequest = false;
    this.searchProjectRequest = true;
    this.searchActiveStatusRequest = false;
    this.searchCompleteStatusRequest = false;

  }

  requestSearchStatus() {
    this.seeUserResultsRequest = false;
    this.searchStatusRequest = true;
    this.searchUserRequest = false;
    this.searchProjectRequest = false;

    // get all existing projects
    this.allProjectsResult = this.api.getProjectsLoadedResult();

    // create two deep copies - one for active projects and another one for complete ones
    this.activeProjects = this.allProjectsResult.Items.slice();
    this.completedProjects = this.allProjectsResult.Items.slice();

    // go through all the projects received and remove those that aren't with status active
    for (let i = this.activeProjects.length - 1; i >= 0; i --) {
      if (this.activeProjects[i].pstatus.S !== 'active') {
          this.activeProjects.splice(i, 1);
      }
    }

    // go through all the projects received and remove those that aren't with status complete
    for (let i = this.completedProjects.length - 1; i >= 0; i --) {
      if (this.completedProjects[i].pstatus.S !== 'completed') {
          this.completedProjects.splice(i, 1);
      }
    }

  }

  searchUserApiCall(form: NgForm) {
    console.log('searching for a user...');
    this.payload = {email: form.value.uemail};
    this.api.searchUser(this.payload);
    this.seeUserResultsRequest = false;
    this.viewSearchUserResultRequest = true;
    this.searchUserRequest = false;

  }

  showSearchedUserResult() {
    this.seeUserResultsRequest = true;
    this.viewSearchUserResultRequest = false;
    this.searchUserResult = this.api.getSearchedUser();
    console.log(this.searchUserResult);
  }

  searchProjectApiCall(form: NgForm) {
    console.log('searching for a project...');
    this.payload = {pname: form.value.pname};
    console.log(this.payload);
    this.api.searchProject(this.payload);
    this.seeProjectResultsRequest = false;
    this.viewSearchProjectResultRequest = true;
    this.searchProjectRequest = false;
  }

  showSearchedProjectResult() {

    this.viewSearchProjectResultRequest = false;

    this.searchProjectResult = this.api.getSearchedProject();
    console.log('helo');
    console.log(this.searchProjectResult);


    if (typeof this.searchProjectResult.developers ===  'undefined') {
      this.searchProjectResult.developers = {SS: ['none']};
    }

    if (typeof this.searchProjectResult.projectmanagers ===  'undefined') {
      this.searchProjectResult.projectmanagers = {SS: ['none']};
    }


    this.seeProjectResultsRequest = true;
  }

  searchProjects(form: NgForm) {
    this.searchActiveStatusRequest = false;
    this.searchCompleteStatusRequest = false;

    if (form.value.active === true) {
      this.searchActiveStatusRequest = true;
    }

    if (form.value.complete === true) {
      this.searchCompleteStatusRequest = true;
    }

  }

}
