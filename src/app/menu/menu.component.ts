import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private _auth: AuthorizationService, private _router: Router) { }

  doLogout() {
    this._auth.logOut();
    this._router.navigateByUrl('');
  }
}
