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
  payload: any = {};
  getResult: any = [];

  constructor(private api: ApiService) { }

  // preload all projects from dynamo upon visiting the projects page
  ngOnInit() {
    this.api.getExistingProjectsOfCurrentUser();
  }

  // Shows a table with all projects from dynamo that were previously loaded (triggered when user clicks the 'Load projects' button)
  loadProjects() {
    this.getResult = this.api.getResult();
    this.newProjectRequest = false;
    this.loadProjectRequest = true;
    document.getElementById('newProjectButton').style.visibility = 'visible';
  }

  // Presents a form to create a new project
  requestNewProject() {
    console.log('New project request yey');
    this.newProjectRequest = true;
    this.loadProjectRequest = false;
    document.getElementById('newProjectButton').style.visibility = 'hidden';
  }

  createProject(form: NgForm) {
    this.payload = { email: form.value.email, name: form.value.name, pdescription: form.value.pdescription};
    console.log(this.payload);
    this.api.createProject(this.payload);
  }

}
