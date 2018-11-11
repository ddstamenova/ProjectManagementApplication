import { Injectable } from '@angular/core';
import { AuthorizationService} from './authorization.service';
import {Http, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  registrationUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/register';
  projectUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/createproject';
  getProjectsUrl = ' https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/getprojects';
  updateUserDetailsUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/updateuserdetails';
  getUserDetailsUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/getuserdetails';
  assignRoleUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/assignrole';
  updateProjectDetailsUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/updateproject';
  assignDevUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/assigndev';
  assignProjectManagerUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/assignprojectmanager';
  searchUserUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/getuserdetails';
  searchProjectUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/getprojectdetails';
  getAllUsersUrl = 'https://68xfcvl1xd.execute-api.eu-west-2.amazonaws.com/prod/getusers ';

  registrationResult: any = {};
  newProjectResult: any = {};
  projectsLoadedResult: any = {};
  updateUserDetailsResult: any = {};
  userDetailsResult: any = {};
  userRoleUpdatedResult: any = {};
  updateProjectDetailsResult: any = {};
  assignDevResult: any = {};
  assignProjectManagerResult: any = {};
  searchUserResult: any = {};
  searchProjectResult: any = {};
  userListResult: any = {};

  isAdminCheck = false;
  isProjectManagerCheck = false;
  isDevCheck = false;

  constructor(private http: Http, private auth: AuthorizationService) { }

  // register user
  register(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.registrationUrl, payload, { headers: headers })  // а
      .subscribe(
      response => {
        console.log(response);
        this.registrationResult = response; // .json();  // а
      },
      error => {
        console.log(error);
      }
    );

  }

  setCurrentUserEmail(email) {
    localStorage.setItem( 'email', email);
  }

  getCurrentUserEmail() {
    return localStorage.getItem('email');
  }

  createProject(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.post(this.projectUrl, payload, { headers: headers })  // а
    .subscribe(
      response => {
        console.log(response);
        this.newProjectResult = response; // .json();  // а
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllUsers() {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.get(this.getAllUsersUrl, { headers: headers })  // а
    .subscribe(
      response => {
        // console.log(response.json());
        this.userListResult = response.json(); // .json();  // а
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllUsersResult () {
    return this.userListResult;
  }


  getAllProjects() {

    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а


    this.http.get(this.getProjectsUrl, { headers: headers })  // а
    .subscribe(
      response => {
        // console.log(response.json());
        this.projectsLoadedResult = response.json(); // .json();  // а
      },
      error => {
        console.log(error);
      }
    );
  }

  getProjectsLoadedResult() {
    return this.projectsLoadedResult;
  }



  updateProjectDetails(payload) {
    const headers = new Headers();
    headers.set('content-type', 'application-json');

    this.http.post(this.updateProjectDetailsUrl, payload, { headers: headers })  // а
    .subscribe(
      response => {
        console.log(response.json());
        this.updateProjectDetailsResult = response.json(); // .json();  // а
      },
      error => {
        console.log(error);
      }
    );
  }

  getCurrentUserDetails() {
    const headers = new Headers();
    headers.set('content-type', 'application-json'); // а

    const payload = { email: this.getCurrentUserEmail()};

    this.http.post(this.getUserDetailsUrl, payload, { headers: headers })  // а
    .subscribe(
      response => {
        console.log(response.json());
        this.userDetailsResult = response.json(); // .json();  // а
        this.setCurrentUserRole(this.userDetailsResult.Item.userrole.S);
      },
      error => {
        console.log(error);
      }
    );
  }


  setCurrentUserRole(role) {
    localStorage.setItem( 'role', role);
  }

  isAdmin() {
    this.isAdminCheck = false;
    if (localStorage.getItem('role') === 'admin') {
      this.isAdminCheck = true;
    }
    return this.isAdminCheck;
  }

  isProjectManager() {
    this.isProjectManagerCheck = false;
    if (localStorage.getItem('role') === 'projectmanager') {
      this.isProjectManagerCheck = true;
    }
    return this.isProjectManagerCheck;
  }

  isDev() {
    this.isDevCheck = false;
    if (localStorage.getItem('role') === 'dev') {
      this.isDevCheck = true;
    }
    return this.isDevCheck;
  }

  // isAdmin() {
  //   console.log(this.userDetailsResult.Item.role.S);
  //   const role = this.userDetailsResult.Item.role.S;
  //   console.log(role);
  // }

  getUserDetailsResult() {
    return this.userDetailsResult;
  }


  updateUserDetails(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json');


    this.http.post(this.updateUserDetailsUrl, payload, { headers: headers })
    .subscribe(
      response => {
        console.log(response);
        this.updateUserDetailsResult = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  assignRole(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json');


    this.http.post(this.assignRoleUrl, payload, { headers: headers })
    .subscribe(
      response => {
        console.log(response);
        this.userRoleUpdatedResult = response;
      },
      error => {
        console.log(error);
      }
    );

  }

  assignDev(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json');


    this.http.post(this.assignDevUrl, payload, { headers: headers })
    .subscribe(
      response => {
        console.log(response);
        this.assignDevResult = response;
      },
      error => {
        console.log(error);
      }
    );

  }

  assignProjectManager(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json');


    this.http.post(this.assignProjectManagerUrl, payload, { headers: headers })
    .subscribe(
      response => {
        console.log(response);
        this.assignProjectManagerResult = response;
      },
      error => {
        console.log(error);
      }
    );

  }

  searchUser(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json');


    this.http.post(this.searchUserUrl, payload, { headers: headers })
    .subscribe(
      response => {
        console.log(response);
        this.searchUserResult = response.json();

      },
      error => {
        console.log(error);
      }
    );
  }

  getSearchedUser() {
    return this.searchUserResult.Item;
  }

  searchProject(payload) {

    const headers = new Headers();
    headers.set('content-type', 'application-json');

    this.http.post(this.searchProjectUrl, payload, { headers: headers })
    .subscribe(
      response => {
        console.log(response);
        this.searchProjectResult = response.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  getSearchedProject() {
    return this.searchProjectResult.Item;
  }

}
