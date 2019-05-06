import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiderTecnicoService } from '../../service/lidertecnico.service';
import { Comunidade } from 'src/app/classes/comunidade';
import { ComunidadeService } from 'src/app/service/comunidade.service';
import { Squads } from 'src/app/classes/squads';
import { Funcionario } from 'src/app/classes/funcionario';
import { Token } from 'src/app/classes/token';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { FuncionarioService } from 'src/app/service/funcionarios.service';
import { SquadsService } from 'src/app/service/squads.service';

@Component({
  selector: 'app-cadastro-squad',
  templateUrl: './cadastro-squad.component.html',
  styleUrls: ['./cadastro-squad.component.css']

})
export class CadastroSquadComponent implements OnInit {

  usuario: Token = new Token();
  token$: Observable<Token>;
  isadmin:boolean = false;
  squad: Squads = new Squads();
  lideresList: Funcionario[] = [];
  comunidadesList: Comunidade[] = [];
  constructor(private liderTecnicoService: LiderTecnicoService, 
              private comunidadeService: ComunidadeService, 
              private squadService: SquadsService,
              private http: HttpClient,
              private userService:UserService,
              private funcionarioService:FuncionarioService) {
                this.token$ = this.userService.getUser();
              }

  ngOnInit() {

    this.criarUsuario();
    this.verificarAdmin();

    //EXECUTA O FETCH LIDERES QUE TÁ NO LIDERESERVICE
    this.buscaLideres();

    /*
    
    //EXECUTA O FETCH FUNCIONARIOS SEM SQUAD QUE TÁ NO FUNCIONARIOS SERVICE
    this.funcionariosList = this.funcionarioService.fetchFuncionarios();    

    */
    this.buscaComunidades();
    

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
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

  CadastrarSquad(): void {
    if (!this.isadmin) {
      this.squad.lider = this.lideresList[0];

      this.squadService.cadastrarSquadByLider(this.squad).subscribe (
        data => {
          alert("CADASTRADO COM SUCESSO !")
          location.reload();
        },
        error => {
          alert("Algo de errado nao esta certo.")
        }
      );
    } else {

    this.squadService.cadastrarSquadByGerente(this.squad).subscribe (
      data => {
        alert("CADASTRADO COM SUCESSO !")
        location.reload();
      },
      error => {
        alert("Algo de errado nao esta certo.")
      }
    );
    }
  }

  buscaComunidades() {
    this.comunidadeService.listarComunidades().subscribe(
      data => {
        this.comunidadesList = data;
      }
    )
  }

  buscaLideres() {
    if (this.isadmin) {
    this.liderTecnicoService.fetchLideres().subscribe(
      data => {
        this.lideresList = data;
      }
    )
   } else {
    this.funcionarioService.listarFuncionariosByEmail(this.usuario.sub).subscribe(
      data => {
        this.lideresList = data;
      }
    )
   }
  } 
}