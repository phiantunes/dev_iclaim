import { Component, OnInit } from '@angular/core';
import { Comunidade } from 'src/app/classes/comunidade';
import { ComunidadeService } from 'src/app/service/comunidade.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-comunidade',
  templateUrl: './cadastro-comunidade.component.html',
  styleUrls: ['./cadastro-comunidade.component.css']
})
export class CadastroComunidadeComponent implements OnInit {


  comunidade: Comunidade = new Comunidade();
  edit: boolean = false;

  constructor(
    private comunidadeService: ComunidadeService,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(parametro => {
      if (parametro["idComunidade"] != undefined) {
        this.buscar(Number(parametro["idComunidade"]))
        this.edit = true;
      }
    });
  }

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

  CadastrarComunidade(): void {
    if (this.edit) {
      this.comunidadeService.editarComunidade(this.comunidade).subscribe(
        data => {
          window.location.href = "/manage/comunidades"; 
        },
        error => {
          alert("erro: "+error);
        }
      )
      
    }else {
      this.comunidadeService.cadastrarComunidade(this.comunidade).subscribe(
        res => {
          alert("Comunidade cadastrada com sucesso!");
          location.reload();
        },
        err => {
          alert("Algo de errado não está certo!");
        }
      );
    }
    
  }

  buscar(idComunidade: number) {
    this.comunidadeService.buscarComunidade(idComunidade).subscribe(
      data => {
        this.comunidade = data;
      }
    )
  }

}
