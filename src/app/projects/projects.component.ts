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
  payload: any = {};

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  requestNewProject(button) {
    console.log('New project request yey');
    this.newProjectRequest = true;
    document.getElementById('newProjectButton').style.display = 'none';
  }

  createProject(form: NgForm) {
    console.log('desu');
    this.payload = { email: form.value.email, name: form.value.name, pdescription: form.value.pdescription};
    console.log(this.payload);
    this.api.createProject(this.payload);
  }

}
