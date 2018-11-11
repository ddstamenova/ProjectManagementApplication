import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(public auth: AuthorizationService, private router: Router) { }

  doLogout() {
    this.auth.logOut();
    this.router.navigateByUrl('');
  }
}
