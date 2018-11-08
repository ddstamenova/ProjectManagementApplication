import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  newProjectRequest = false;

  constructor() { }

  ngOnInit() {
  }

  requestNewProject(button) {
    console.log('New project request yey');
    this.newProjectRequest = true;
    document.getElementById('newProjectButton').style.display = 'none';
  }

  createProject() {
    console.log('desu');
  }

}
