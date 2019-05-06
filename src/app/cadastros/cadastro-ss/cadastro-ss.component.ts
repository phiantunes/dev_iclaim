import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SquadsService } from '../../service/squads.service';
import { Squads } from 'src/app/classes/squads';
import { Ss } from 'src/app/classes/ss';
import { HorasDisponiveis } from 'src/app/classes/horasdisponiveis';
import { Token } from 'src/app/classes/token';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { FuncionarioService } from 'src/app/service/funcionarios.service';

@Component({
  selector: 'app-cadastro-ss',
  templateUrl: './cadastro-ss.component.html',
  styleUrls: ['./cadastro-ss.component.css']

})

export class CadastroSSComponent implements OnInit {

  
  usuario: Token = new Token();
  token$: Observable<Token>;
  isadmin:boolean = false;

  //VARIAVEL PARA A LISTA DE SQUADS E CONSTRUTORES
  visivel:number = 0;
  mostrarsquad:boolean = false;
  modelodess:Ss = new Ss();
  squadlist:Squads[] = [];
  hrDiv:any;
  selectedSquad:Squads;
  constructor(
    private squadsService: SquadsService, 
    private http: HttpClient,
    private userService:UserService,
    private funcionarioService:FuncionarioService) {
      this.token$ = this.userService.getUser();
    }

    httpHeader = {
      headers: new HttpHeaders({
       'Authorization': "Bearer " + this.userService.getTokenClean()
      }),
      withCredentials: true
     };

  //MODELO COM VALORES INCIIAIS PARA SEREM PREENCHIDOS PELO FORM

  ngOnInit() {

    this.criarUsuario();
    this.verificarAdmin();

    this.listarSquads();

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
    })()

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

  //FUNÇÃO PARA ENVIAR O FORM COMO JSON PARA O BACK
  CadastrarSS(): void {

    let totalHorasPlanejadas = 0;

      if (this.modelodess.dataInicio > this.modelodess.dataTermino){
        alert("Datas inicial maior do que a data final, reveja o calendario")
        return;
      }


      if (this.modelodess.forLider == false) {

        for (let hrDisp of this.modelodess.horasDisponiveis) {
          if (hrDisp.horasPlanejadas < 0) {
            alert("Nao e possivel cadastrar horas negativas.");
            return;
          }
          totalHorasPlanejadas = totalHorasPlanejadas + hrDisp.horasPlanejadas;
        }

      if (totalHorasPlanejadas < this.modelodess.totalHoras) {
        alert("Distribua todas as horas.");
        return;
      }

      if (totalHorasPlanejadas > this.modelodess.totalHoras) {
        alert("Total de horas distribuidas maior que total de horas da ss.");
        return;
      }
    }

    if (!this.isadmin) {
      this.modelodess.enable = true;
      let url = "http://localhost:8080/desafio-luco/protected/ss/save";
      this.http.post(url, this.modelodess, this.httpHeader).subscribe(
        res => {
          alert("SS cadastrada com sucesso!");
          location.reload();
        },
        err => {
          alert("Algo de errado não está certo.");
        }
      );

    } else {
      this.modelodess.enable = true;
      let url = "http://localhost:8080/desafio-luco/admin/ss/save";
      this.http.post(url, this.modelodess, this.httpHeader).subscribe(
        res => {
          alert("SS cadastrada com sucesso!");
          location.reload();
        },
        err => {
          alert("Algo de errado não está certo.");
        }
      );
    }


  }

  ficarvisivel() {
    if (this.modelodess.forLider == false) {
    this.visivel = 1;
    this.modelodess.horasDisponiveis = [];
  
    let hrDisp, foundFunc;
    if (this.selectedSquad != null){
      for (let funcionario of this.selectedSquad.funcionarios) {
        foundFunc = false;
          
        for (hrDisp of this.modelodess.horasDisponiveis) {
          if (funcionario.idFuncional == hrDisp.funcionario.idFuncional) {
            foundFunc = true;
          }
        }
        if (foundFunc) {
          continue;
        }
        hrDisp = new HorasDisponiveis();

        hrDisp.funcionario = funcionario;
        this.modelodess.horasDisponiveis.push(hrDisp);
        
      }

      this.modelodess.squad = this.selectedSquad;
      this.modelodess.forLider = false;
    }
  } else {
    this.visivel = 2;
    this.modelodess.horasDisponiveis = [];
    let hrDisp;
    hrDisp = new HorasDisponiveis();

 

    this.modelodess.squad = this.selectedSquad;

    hrDisp.horasPlanejadas = this.modelodess.totalHoras;
    hrDisp.funcionario = this.selectedSquad.lider;
    
    this.modelodess.horasDisponiveis.push(hrDisp);
    


    this.modelodess.forLider = true;

    }
  }

  listarSquads() {
  //EXECUTA O FETCH SQUADS QUE TÁ NO SQUADSERVICE
  if (this.isadmin){
  this.squadsService.fetchSquads().subscribe(
    data => {
      this.squadlist = data;
      for (let squad of this.squadlist) {
        if (this.modelodess.squad != null) {
          if (squad.name = this.modelodess.squad.name) {
            this.selectedSquad = squad;
            
          }
        }
      }
    }
    )
  } else {
    this.squadsService.listarSquadsByEmail(this.usuario.sub).subscribe(
      data => {
        this.squadlist = data;
        for (let squad of this.squadlist) {
          if (this.modelodess.squad != null) {
            if (squad.name = this.modelodess.squad.name) {
              this.selectedSquad = squad;
              
            }
          }
        }
      }
      )
    
  }
}

limpartabela() {
  this.visivel = 0;
  this.selectedSquad = null;

}

mostrarSquad() {
  this.mostrarsquad = true;
}


}

