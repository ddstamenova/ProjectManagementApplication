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
  editProjectRequest = false;
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

    console.log(this.canCreateProject);
    console.log('has rights');
  }

  editProject(projectName: string) {
    if (this.canCreateProject === true) {
      console.log(projectName);
      this.editProjectRequest = true;
      this.editProjectName = projectName;




    }

  }

  editProjectApiCall(form: NgForm) {
    this.payload = { name: this.editProjectName, pdescription: form.value.updescription, pstatus: form.value.upstatus };
    console.log(this.payload);
    this.api.updateProjectDetails(this.payload);
  }

  // Shows a table with all projects from dynamo that were previously loaded (triggered when user clicks the 'Load projects' button)
  loadProjects() {
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

  // Presents a form to create a new project
  requestNewProject() {
    this.editProjectRequest = false;
    this.newProjectRequest = true;
    this.loadProjectRequest = false;
    document.getElementById('newProjectButton').style.visibility = 'hidden';
  }

  createProject(form: NgForm) {
    this.payload = { email: form.value.email, name: form.value.name, pdescription: form.value.pdescription};
    console.log(this.payload);
    this.api.createProject(this.payload);
  }

  update() {
    window.location.reload();
  }

}
