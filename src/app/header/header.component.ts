import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user/user.service';
import { Observable } from 'rxjs';
import { Token } from '../classes/token';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit{


  usuario: Token = new Token();
  token$: Observable<Token>;
  isadmin:boolean = false;

  constructor(private userService:UserService, private location: Location, private router: Router) { 
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

BackHistory() {
  this.location.back();
}

logout(){
  this.userService.logout();
  this.router.navigate(['']);
  alert('Logout feito com sucesso! Você será redirecionado para a página de login.');
}

}