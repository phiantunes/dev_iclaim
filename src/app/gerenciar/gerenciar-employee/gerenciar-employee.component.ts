import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/classes/funcionario';
import { FuncionarioService } from 'src/app/service/funcionarios.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-gerenciar-employee',
  templateUrl: './gerenciar-employee.component.html',
  styleUrls: ['./gerenciar-employee.component.css']
})
export class GerenciarEmployeeComponent implements OnInit {

  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.funcionarioService.listarFuncionarios().subscribe(
      data => {
        this.funcionarios = data;
      },
      error => {
        console.debug(error);
      }

    )
  }

  deletar(funcional:number) {
    console.log(funcional);
    this.funcionarioService.deletar(funcional).subscribe(
      data => {
        console.log(data);
        this.listar();
      },
      error => {
        alert("Funcionario com dados vinculados, para deletar, remova-o de suas atribuicoes")
      }
    )
  }

}
