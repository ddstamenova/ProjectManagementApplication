import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  newProjectRequest = false;
  loadProjectRequest = false;
  canCreateProject = false;
  updateProjectRequest = false;

  editProjectRequest = false;
  assignDevRequest = false;
  assignPMRequest = false;

  payload: any = {};
  getResult: any = [];
  editProjectName = '';

  constructor(private api: ApiService) { }

  // preload all projects from dynamo upon visiting the projects page
  ngOnInit() {
    this.api.getAllProjects();

    if (this.api.isAdmin() === true || this.api.isProjectManager() === true) {
      this.canCreateProject = true;
    }
  }

  requestEditProject() {
    this.editProjectRequest = true;
    this.assignDevRequest = false;
    this.assignPMRequest = false;
    document.getElementById('editProject').style.visibility = 'hidden';
    document.getElementById('assignDev').style.visibility = 'visible';
    document.getElementById('assignPM').style.visibility = 'visible';
  }

  requestAssignDev() {
    this.assignDevRequest = true;
    this.assignPMRequest = false;
    this.editProjectRequest = false;
    document.getElementById('assignDev').style.visibility = 'hidden';
    document.getElementById('assignPM').style.visibility = 'visible';
    document.getElementById('editProject').style.visibility = 'visible';
  }

  requestAssignProjectManager() {
    this.assignPMRequest = true;
    this.editProjectRequest = false;
    this.assignDevRequest = false;
    document.getElementById('assignPM').style.visibility = 'hidden';
    document.getElementById('editProject').style.visibility = 'visible';
    document.getElementById('assignDev').style.visibility = 'visible';
  }




  requestUpdateProject(projectName: string) {
    if (this.canCreateProject === true) {
      console.log(projectName);
      this.updateProjectRequest = true;
      this.editProjectName = projectName;
     }
  }

  // Presents a form to create a new project
  requestNewProject() {
    this.updateProjectRequest = false;
    this.newProjectRequest = true;
    this.loadProjectRequest = false;
    document.getElementById('newProjectButton').style.visibility = 'hidden';
  }

  assignDevApiCall(form: NgForm) {
    this.payload = { name: this.editProjectName, developer: form.value.devemail };
    this.api.assignDev(this.payload);
  }

  assignProjectManagerApiCall(form: NgForm) {
    this.payload = { name: this.editProjectName, projectmanager: form.value.pmemail };
    this.api.assignProjectManager(this.payload);
  }




  createProjectApiCall(form: NgForm) {
    this.payload = { email: form.value.email, name: form.value.name, pdescription: form.value.pdescription};
    this.api.createProject(this.payload);
  }

  // Shows a table with all projects from dynamo that were previously loaded (triggered when user clicks the 'Load projects' button)
  loadProjectsApiCall() {
    this.getResult = this.api.getProjectsLoadedResult();

    // go through all the projects received and remove those that aren't created by the current user
    for (let i = this.getResult.Items.length - 1; i >= 0; i --) {
      if (this.getResult.Items[i].email.S !==  this.api.getCurrentUserEmail()) {
          this.getResult.Items.splice(i, 1);
      }
    }

    this.newProjectRequest = false;
    this.loadProjectRequest = true;
    document.getElementById('newProjectButton').style.visibility = 'visible';
  }

  editProjectApiCall(form: NgForm) {
    this.payload = { name: this.editProjectName, pdescription: form.value.updescription, pstatus: form.value.upstatus };
    this.api.updateProjectDetails(this.payload);
  }

  update() {
    window.location.reload();
  }

}
