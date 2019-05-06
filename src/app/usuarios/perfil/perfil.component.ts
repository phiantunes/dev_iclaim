import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Token } from 'src/app/classes/token';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Token = new Token();
  token$: Observable<Token>;
  isadmin:boolean = false;



  constructor( private userService:UserService ) {
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
