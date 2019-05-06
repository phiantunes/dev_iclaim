import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Squads } from 'src/app/classes/squads';
import { Ss } from 'src/app/classes/ss';
import * as moment from 'moment';
import { PaginacaoHorasPrev } from 'src/app/classes/PaginacaoHorasPrev';
import { HorasPrevista } from 'src/app/classes/horasprevista';
import { HorasDisponiveis } from 'src/app/classes/horasdisponiveis';
import { ComunidadeService } from 'src/app/service/comunidade.service';
import { Comunidade } from 'src/app/classes/comunidade';
import { HorasPrevistaService } from 'src/app/service/horasprevista.service';

@Component({
  selector: 'app-lancamento-gerente',
  templateUrl: './lancamento-gerente.component.html',
  styleUrls: ['./lancamento-gerente.component.css']
})
export class LancamentoGerenteComponent implements OnInit {

  constructor( 
    private http: HttpClient,
    private comunidadeService: ComunidadeService,
    private horasDisponiveisService: HorasPrevistaService
  ) { }

  comunidade:Comunidade = new Comunidade();
  comunidades: Comunidade[];
  dataAtual:Date = new Date();
    

  ngOnInit() {

    this.listarComunidades();   

  }

  listarComunidades() {
    this.comunidadeService.listarComunidades().subscribe(
      data => {
        this.comunidades = data;
        this.removerRegistrosNaoExibiveis();
        this.carregarPaginacao();
        
      },
      error => {
        console.log("ERROR:", error);
      }
    );

  }

  ShowHidden(): void {
    var divs = document.getElementsByClassName('second-form');
    var validation = Array.prototype.filter.call(divs, function (div) {
      div.classList.add('div-visible');
    });
  }

  iniciarNovaPagina(pagina:number):any {
    let paginacao:PaginacaoHorasPrev;

    paginacao = new PaginacaoHorasPrev();
    paginacao.pagina = pagina;
    paginacao.horasPrevista = [];
    
    return paginacao;
  }

  sortHrPrev(hrPrevs:HorasPrevista[]):void {
    hrPrevs.sort(function(a, b){
      if(a.data < b.data) { return -1; }
      if(a.data > b.data) { return 1; }
      return 0;
    })
  }

  sortPaginacao(pages:PaginacaoHorasPrev[]):void {
    for (let page of pages) {
      this.sortHrPrev(page.horasPrevista);
    }
  }

  removerRegistrosNaoExibiveis():void {
    let squads:Squads[] = [];

    for (let comunidade of this.comunidades) {
      for (let squad of comunidade.squads) {
        if (squad.sss.length <= 0) {
          squads.push(squad);
        }
      }

      for (let squad of squads) {
        comunidade.squads.splice(comunidade.squads.indexOf(squad),1);
      }
    }
  }

  carregarPaginacao(): void {
    let pagina:number = 1;
    let paginaDataAtual:number = 0;
    let paginacao:PaginacaoHorasPrev;


    for (let comunidade of this.comunidades) {
      for (let squad of comunidade.squads) {
        for (let ss of squad.sss) { 
          for (let hrDisp of ss.horasDisponiveis) {

            hrDisp.paginacaoHorasPrev = [];
            pagina = 1; 

            this.sortHrPrev(hrDisp.horasPrevista);

            for (let hrPrev of hrDisp.horasPrevista) {
              
              paginacao = this.iniciarNovaPagina(pagina);

              hrPrev.lancamentoCorreto = true;
              if (hrPrev.horasLancadas < hrPrev.horasPrevistas || 
                (hrPrev.horasLancadas <= 0 && hrPrev.horasPrevistas > 0)) {
                  hrPrev.lancamentoCorreto = false;
              }

              if (moment(hrPrev.data).format('L') == moment(this.dataAtual).format('L')) {
                paginaDataAtual = pagina - 1;
                ss.todayPage = paginaDataAtual;
              }

              paginacao.horasPrevista.push(hrPrev);

              hrDisp.paginacaoHorasPrev.push(paginacao);
              pagina++;         
            }

            this.sortPaginacao(hrDisp.paginacaoHorasPrev);
            ss.selectedPage = paginaDataAtual;          
          }

        }
      }
    }
  }

  actualPage(ss:Ss): void {
    if (moment(this.dataAtual).format('L') > moment(ss.dataInicio).format('L')) {
      ss.selectedPage = ss.todayPage;  
    }
    
  }

  nextPage(ss:Ss): void {
    let noMorePages:boolean = false;
	  let page:number = ss.selectedPage + 1;

    for (let hrDisp of ss.horasDisponiveis) {
      if (hrDisp.paginacaoHorasPrev.length <= page) {
        noMorePages = true;
      }
    }

    if (!noMorePages) {      
      ss.selectedPage++;
    }
  }

  previousPage(ss:Ss): void {
    let noMorePages:boolean = false;

    let page:number = ss.selectedPage - 1;
    if (page >= 0) {
      ss.selectedPage--;
    } else {
      noMorePages = true;
    }
  }
 
  confirmarLancamento(hrPrev:HorasPrevista, hrDisp:HorasDisponiveis) {
    hrPrev.lancamentoConfirmado = !hrPrev.lancamentoConfirmado;

    hrPrev.horasDisponiveis = new HorasDisponiveis();
    hrPrev.horasDisponiveis.id = hrDisp.id;

    this.horasDisponiveisService.confirmarLancamento(hrPrev).subscribe(
      data => {},
      error => {
        alert("Nao foi possivel salvar a confirmacao.");
        hrPrev.lancamentoConfirmado = !hrPrev.lancamentoConfirmado;
      }
    );
  }
}

