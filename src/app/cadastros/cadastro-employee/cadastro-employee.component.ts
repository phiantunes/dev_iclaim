import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SquadsService } from '../../service/squads.service';
import { Token } from 'src/app/classes/token';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { FuncionarioService } from 'src/app/service/funcionarios.service';

@Component({
  selector: 'app-cadastro-employee',
  templateUrl: './cadastro-employee.component.html',
  styleUrls: ['./cadastro-employee.component.css']

})



export class CadastroEmployeeComponent implements OnInit {

  usuario: Token = new Token();
  token$: Observable<Token>;
  isadmin:boolean = false;

  verificar: any = 0;

  squadlist: any;
  constructor(private squadsService: SquadsService, private http: HttpClient, private userService:UserService,
    private funcionarioService:FuncionarioService) {
      this.token$ = this.userService.getUser();
    }

    httpHeader = {
      headers: new HttpHeaders({
       'Authorization': "Bearer " + this.userService.getTokenClean()
      }),
      withCredentials: true
     };

  model:CadastroEmployeeViewModel = {
    idFuncional:'',
    nome:'',
    email:'',
    perfil:'',
    squad: {}
  };

  ngOnInit() {

    this.criarUsuario();
    this.verificarAdmin();

    this.listarSquads();
    
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {

      function pegarSquads(){

      }

      'use strict';
      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
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

  listarSquads() {
    //EXECUTA O FETCH SQUADS QUE TÁ NO SQUADSERVICE
    if (this.isadmin){
    this.squadlist = this.squadsService.fetchSquads();
    } else {
      this.squadlist = this.squadsService.listarSquadsByEmail(this.usuario.sub)
    }
  }


  CadastrarFuncionario(): void {

    if  ((this.model.squad == null) && (this.model.perfil != "LiderTecnico")) {
      alert("Nao e possivel cadastrar funcionario sem Squad !");
      return;
    }

    if (!this.isadmin) {

    let url = "http://localhost:8080/desafio-luco/protected/funcionarios/save";
    this.http.post(url, this.model , this.httpHeader).subscribe(
      res => {
        alert("Cadastro feito com sucesso!");
        location.reload();
      },
      err => {
        alert("Algo de errado não está certo.");
      }
    );
    } else {

      let url = "http://localhost:8080/desafio-luco/admin/funcionarios/save";
    this.http.post(url, this.model , this.httpHeader).subscribe(
      res => {
        alert("Cadastro feito com sucesso!");
        location.reload();
      },
      err => {
        alert("Algo de errado não está certo.");
      }
    );

    } 
  }

  verifica() {
    if (this.model.perfil != "LiderTecnico") {
      this.verificar = 1;
      return;
    } else {
      this.verificar = 0;
      this.model.squad = null;
    }
  }

}

export interface CadastroEmployeeViewModel{
  idFuncional:string;
  nome:string;
  email:string;
  perfil:string;
  squad:any;
}
