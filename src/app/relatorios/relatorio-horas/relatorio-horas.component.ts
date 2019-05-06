import { Component, OnInit } from '@angular/core';
import { ComunidadeService } from 'src/app/service/comunidade.service';
import { Comunidade } from 'src/app/classes/comunidade';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from 'src/app/service/ExcelService.service';
import { Excel } from 'src/app/classes/excel';
import * as moment from 'moment';
import { HorasPrevista } from 'src/app/classes/horasprevista';


@Component({
  selector: 'app-relatorio-horas',
  templateUrl: './relatorio-horas.component.html',
  styleUrls: ['./relatorio-horas.component.css']
})
export class RelatorioHorasComponent implements OnInit {

  dataInicio:Date = new Date();
  dataTermino:Date = new Date();
  filtro:String;
  comunidades: Comunidade[];

  excel: Excel;

  constructor(
    private http: HttpClient,
    private comunidadeService: ComunidadeService,
    private excelService: ExcelService) {
    
   }

  ngOnInit() {

  }

  gerarRelatorio() {
    this.comunidadeService.listarComunidades().subscribe(
      data => {
        this.comunidades = data;    
        this.montarExcel();
      },
      error => {
        console.log("ERROR:", error);
      }
    );
  }

  montarExcel() {
    this.gerarHeader();

    this.criarCorpoExcel();
  }

  criarCorpoExcel() {
    let dataAux = new Date(this.dataInicio);
    let dataAuxFim = new Date(this.dataTermino);
    let row:string[];
    let comunidadeRow:string[];

    let comunidadeFuncionarios:string[][];

    for (let comunidade of this.comunidades) {
      comunidadeRow = [];
      comunidadeFuncionarios = [];

      comunidadeRow.push(comunidade.comunidadeName.toString());

      if (comunidade.squads.length == 0) {
        this.fillEmptyRow(comunidadeRow);
        continue;
      }

      for (let squad of comunidade.squads) {
        // VALIDAR SQUAD SEM SS

        for (let ss of squad.sss) {
          // VALIDAR SE SS CONTEMPLA A RANGE DE DATA

          for (let hrDisp of ss.horasDisponiveis) {
            this.fillForFuncionario(hrDisp.funcionario.nome.toString(), comunidadeFuncionarios, hrDisp.horasPrevista);
          }
        }
      }      

      this.fillComunidadeSection(comunidadeRow,comunidadeFuncionarios);
    }

    this.excel.name = "teste";
    this.exportAsXLSX();
  }

  fillComunidadeSection(comunidadeRow:string[], comunidadeFuncionarios:string[][]) {
    let dataAux = new Date(this.dataInicio);
    let dataAuxFim = new Date(this.dataTermino);

    let index:number = 1;

    this.excel.rows.push(comunidadeRow);

    while (dataAux <= dataAuxFim ) {  
      comunidadeRow.push("0");
      for (let funcionario of comunidadeFuncionarios) {
        if (funcionario[index] != "") {
          comunidadeRow[index] = (parseFloat(comunidadeRow[index]) + parseFloat(funcionario[index])).toString();
        }
      }

      index++;
      dataAux.setDate(dataAux.getDate() + 1);
    }
    
    for (let funcionario of comunidadeFuncionarios) {
      this.excel.rows.push(funcionario);
    }
  }

  fillForFuncionario(name:string, comunidadeFuncionarios:string[][], hrPrevs:HorasPrevista[]) {
    let row:string[] = [];
    let funcionarioFound = false;
    for (let funcionario of comunidadeFuncionarios) {
      if (funcionario[0] == name) {
        funcionarioFound = true;

        this.fillLancamentoFuncionarioExistente(hrPrevs,funcionario);
      }
    }

    if (!funcionarioFound) {      
      row.push(name);

      this.fillLancamentoFuncionarioNovo(hrPrevs,row);

      comunidadeFuncionarios.push(row);
    }
  }

  fillLancamentoFuncionarioExistente(hrPrevs:HorasPrevista[], row:string[]) {
    let dataAux = new Date(this.dataInicio);
    let dataAuxFim = new Date(this.dataTermino);

    let index:number = 1;

    let dataPrev;

    while (dataAux <= dataAuxFim ) {
  
      for (let hrPrev of hrPrevs) {
        dataPrev = moment(hrPrev.data).format('L');

        if (dataPrev == moment(dataAux).format('L')) {
          row[index] = (parseFloat(row[index]) + hrPrev.horasLancadas).toString();
        }
      }

      index++;
      dataAux.setDate(dataAux.getDate() + 1);
    }
  }

  fillLancamentoFuncionarioNovo(hrPrevs:HorasPrevista[], row:string[]) {
    let dataAux = new Date(this.dataInicio);
    let dataAuxFim = new Date(this.dataTermino);

    let dataPrev;
    let fillData: Boolean = false;

    while (dataAux <= dataAuxFim ) {
      
      fillData = false;
      for (let hrPrev of hrPrevs) {
        dataPrev = moment(hrPrev.data).format('L');

        if (dataPrev == moment(dataAux).format('L')) {
          fillData = true;
          row.push(hrPrev.horasLancadas.toString());
        }
      }

      if (!fillData) {
        row.push("");
      }

      dataAux.setDate(dataAux.getDate() + 1);
    }
  }

  fillEmptyRow(row:string[]) {
    let dataAux = new Date(this.dataInicio);
    let dataAuxFim = new Date(this.dataTermino);

    while (dataAux <= dataAuxFim ) {
      row.push("");

      dataAux.setDate(dataAux.getDate() + 1);
    }
  }

  gerarHeader() {
    let dataAux = new Date(this.dataInicio);
    let dataAuxFim = new Date(this.dataTermino);
    let header:string[] = [];

    header.push("Row Labels");
    
    while (dataAux <= dataAuxFim ) {
      header.push(moment(dataAux).format('L'));

      dataAux.setDate(dataAux.getDate() + 1);
    }

    header.push("Grand Total");

    this.excel = new Excel(header);
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.excel);
  }

}
