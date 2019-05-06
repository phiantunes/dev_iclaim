import { Component, OnInit } from '@angular/core';
import { Comunidade } from 'src/app/classes/comunidade';
import { ComunidadeService } from 'src/app/service/comunidade.service';

@Component({
  selector: 'app-gerenciar-comunidades',
  templateUrl: './gerenciar-comunidades.component.html',
  styleUrls: ['./gerenciar-comunidades.component.css']
})
export class GerenciarComunidadesComponent implements OnInit {

  comunidades: Comunidade[] = [];

  constructor(
    private comunidadeService: ComunidadeService
  ) { }

  ngOnInit() {
    this.listar();
  }
  
  listar() {
    this.comunidadeService.listarComunidades().subscribe(
      data => {
        this.comunidades = data;
      },
      error => {
        console.debug(error);
      }
    )
  }

  deletar(idComunidade:number) {
    this.comunidadeService.deletar(idComunidade).subscribe(
      data => {
        this.listar();
      },
      error => {
        alert("Funcionario com dados vinculados, para deletar, remova-o de suas atribuicoes")
      }
    )
  }

}
