import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Funcionario } from 'src/app/classes/funcionario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuncionarioService } from 'src/app/service/funcionarios.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.css']
})
export class CadastroUserComponent implements OnInit {

  user: User = new User();
  lider: Funcionario = new Funcionario();
  roleVisivel: number;

  constructor(private http: HttpClient, private funcionarioService:FuncionarioService, private usuariosService: UsuariosService) { }

  ngOnInit() {

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

  CadastrarUsuario() {

    if (this.roleVisivel == 1) {

      this.lider.perfil = "LiderTecnico";
      this.funcionarioService.cadastrarFuncionarioPorAdmin(this.lider).subscribe (
        data => {
          alert("CADASTRADO COM SUCESSO !")
          location.reload();
        },
        error => {
          alert("Algo de errado nao esta certo.")
        }
      );


      } else if (this.roleVisivel == 2) {
        this.user.admin = true;
        this.usuariosService.cadastrarGerente(this.user).subscribe (
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

}
