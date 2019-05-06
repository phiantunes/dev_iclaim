import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user/user.service';
import { Observable } from 'rxjs';
import { Token } from '../classes/token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {

  usuario: Token = new Token();
  token$: Observable<Token>;
  isadmin:boolean = false;

  constructor(private userService:UserService) {
    this.token$ = this.userService.getUser();
   }

  ngOnInit() {

    this.criarUsuario();
    this.verificarAdmin();

  }

  criarUsuario() {
    this.userService.getUser().subscribe(
      data => {
        this.usuario = data;
      }
    )
  }

  verificarAdmin() {
      if (this.usuario.scopes.length > 1) {
        this.isadmin = true;
      }

    }

}