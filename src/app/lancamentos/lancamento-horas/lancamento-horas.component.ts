import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiderTecnicoService2 } from 'src/app/service/lidertecnico2.service';
import { SquadByLiderService } from 'src/app/service/squad-by-lider.service';
import { Squads } from 'src/app/classes/squads';
import { Funcionario } from 'src/app/classes/funcionario';
import { Ss } from 'src/app/classes/ss';
import * as moment from 'moment';
import { PaginacaoHorasPrev } from 'src/app/classes/PaginacaoHorasPrev';
import { HorasPrevista } from 'src/app/classes/horasprevista';
import { SsService } from 'src/app/service/ss.service';
import { HorasDisponiveis } from 'src/app/classes/horasdisponiveis';
import { Token } from 'src/app/classes/token';
import { Observable } from 'rxjs';
import { SquadsService } from 'src/app/service/squads.service';
import { UserService } from 'src/app/core/user/user.service';
import { FuncionarioService } from 'src/app/service/funcionarios.service';
@Component({
  selector: 'app-lancamento-horas',
  templateUrl: './lancamento-horas.component.html',
  styleUrls: ['./lancamento-horas.component.css']

})
export class LancamentoHorasComponent implements OnInit {

  usuario: Token = new Token();
  token$: Observable<Token>;
  isadmin:boolean = false;
  idLider:number;

  constructor(
    private liderTecnicoService: LiderTecnicoService2,
    private squadByLiderService: SquadByLiderService,
    private ssService: SsService,
    private http: HttpClient,
    private squadsService: SquadsService,
    private userService:UserService,
    private funcionarioService:FuncionarioService,
    ) {
      this.token$ = this.userService.getUser();
    }

  lideresList: Funcionario[];
  listaLider:Funcionario[];
  squadList: Squads[];
  ssList: Ss[];
  funcionariosList: Funcionario[];
  week: any[][] = [];
  modelLider:Funcionario[] = [];
  dataAtual:Date = new Date();
  horaAtual:number;
  minutoAtual:number;
  horaPermitir:number = 21;
  minutoPermitir:number = 0;
    


  ngOnInit() {

    
    this.criarUsuario();
    this.verificarAdmin();

    this.horaAtual = +moment(this.dataAtual).format('HH');
    this.minutoAtual = +moment(this.dataAtual).format('mm');

    if (this.isadmin){
    this.listarLideres();
    }
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

  listarLideres() {
    this.liderTecnicoService.fetchLideres().subscribe(
      data => {
        this.lideresList = data;
      },
      error => {
        console.log("ERROR:", error);
      }
    );
  }

  SelecionarLider(idFuncional): void {
    this.squadByLiderService.PegarSquad(idFuncional).subscribe(
      data => {
        this.squadList = data;

        this.carregarPaginacao();

        this.removerRegistrosNaoExibiveis();

        let i = 0;
        for (let squad of this.squadList) {

          squad.sss.sort(function(a, b){
            if(a.forLider && !b.forLider) { return -1; }
            if(!a.forLider && b.forLider) { return 1; }
            return 0;
          })
        }       

        this.ShowHidden();
      },
      error => {
        console.debug("ERROR:", error);
      }
    )
  }

  SelecionarLiderByEmail(): void {
    this.squadByLiderService.PegarSquadByEmail(this.usuario.sub).subscribe(
      data => {
        this.squadList = data;

        this.carregarPaginacao();

        this.removerRegistrosNaoExibiveis();

        let i = 0;
        for (let squad of this.squadList) {

          squad.sss.sort(function(a, b){
            if(a.forLider && !b.forLider) { return -1; }
            if(!a.forLider && b.forLider) { return 1; }
            return 0;
          })
        }       

        this.ShowHidden();
      },
      error => {
        console.debug("ERROR:", error);
      }
    )
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

  preencherDatasAnteriores(weekNumber:number,paginacao:PaginacaoHorasPrev,hrPrev:HorasPrevista):any {
    let i = 0;
    let dataAux:Date;
    while (weekNumber > i) {
      dataAux = new Date(hrPrev.data);
      dataAux.setDate(dataAux.getDate() - (weekNumber - i - 1));
      paginacao.horasPrevista.push(new HorasPrevista(0,dataAux,0,0,null));

      i++;
    }
  }

  preencherDatasPosteriores(weekNumber:number,paginacao:PaginacaoHorasPrev,oldData:Date):any {
    let i = weekNumber+1;
    let dataAux:Date;
    while (i < 7) {
      console.log(oldData);
      dataAux = new Date(oldData);
      dataAux.setDate(dataAux.getDate() + (7 - i + 1));
      paginacao.horasPrevista.push(new HorasPrevista(0,dataAux,0,0,null));

      i++;
    }
  }

  removerRegistrosNaoExibiveis():void {
    let indexElement;
    let horasRestantesNaDataAtual = false;

    let hrDisps:HorasDisponiveis[] = [];
    let sss:Ss[] = [];
    let squads:Squads[] = [];

    for (let squad of this.squadList) {
      sss = [];

      if (squad.sss.length <= 0) {
        squads.push(squad);
        continue;
      }
      for (let ss of squad.sss) {  
        hrDisps = []; 
        if (new Date(ss.dataTermino) < new Date()) {
          sss.push(ss);

          if (squad.sss.length == sss.length) {
            squads.push(squad);
          }
        } else {
          for (let hrDisp of ss.horasDisponiveis) {
            horasRestantesNaDataAtual = false;

            for (let hrPrev of hrDisp.horasPrevista) {
              if (moment(hrPrev.data).format('L') == moment(this.dataAtual).format('L') && hrPrev.horasLancadas > 0) {
                horasRestantesNaDataAtual = true;
              }
            }

            
            if (!horasRestantesNaDataAtual && hrDisp.horasPlanejadas-hrDisp.horasConsumidas <= 0) {
              hrDisps.push(hrDisp);
                
              if (ss.horasDisponiveis.length == hrDisps.length) {
                sss.push(ss);
              }
            }

          }
        }

        for (let hrDisp of hrDisps) {
          ss.horasDisponiveis.splice(ss.horasDisponiveis.indexOf(hrDisp),1);
        }
      }    
            

      for (let ss of sss) {
        squad.sss.splice(squad.sss.indexOf(ss),1);
      }
    }

    for (let squad of squads) {
      this.squadList.splice(this.squadList.indexOf(squad),1);
    }
  }

  verificarHoras(hrDisp:HorasDisponiveis,hrPrev:HorasPrevista,ss:Ss) {

    let horasConsumidas:number = (+hrDisp.oldQtdHorasConsumidas - +hrPrev.oldQtdHorasLancadas) + +hrPrev.horasLancadas;
    ss.permitirSalvar = false;

    if (hrPrev.horasLancadas < 0) {
      alert("Nao e possivel lancar hora negativa !");
      ss.permitirSalvar = false;
      return;
    }

    if (horasConsumidas > hrDisp.horasPlanejadas) {
      alert("Horas lancadas nao pode ultrapassar as horas disponiveis.");
      ss.permitirSalvar = false;
      return;
    }
    if (hrPrev.horasLancadas > hrPrev.horasPrevistas) {
      alert("ALERTA: Horas Lancadas maior do que as Horas Previstas");
    }

    hrDisp.horasConsumidas = horasConsumidas;
    ss.permitirSalvar = true;
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

  carregarPaginacao(): void {
    let weekNumber:number;
    let pagina:number = 1;
    let paginaDataAtual:number = 0;
    let oldPagina:number = 0;
    let paginacao:PaginacaoHorasPrev;
    let oldData:Date;


    for (let squad of this.squadList) {
      for (let ss of squad.sss) { 
        ss.permitirSalvar = true;
        //ss.oldQtdHorasRestantes = ss.horasRestantes;

        for (let hrDisp of ss.horasDisponiveis) {
          
          hrDisp.oldQtdHorasConsumidas = hrDisp.horasConsumidas;
          hrDisp.paginacaoHorasPrev = [];
          pagina = 1; 
             
          paginacao = this.iniciarNovaPagina(pagina);

          this.sortHrPrev(hrDisp.horasPrevista);

          for (let hrPrev of hrDisp.horasPrevista) {

            weekNumber = +moment(hrPrev.data).format('d');

            if (oldPagina != pagina) {
              this.preencherDatasAnteriores(weekNumber,paginacao,hrPrev);
            }           

            hrPrev.lancamentoCorreto = true;
            if (hrPrev.horasLancadas < hrPrev.horasPrevistas || 
              (hrPrev.horasLancadas <= 0 && hrPrev.horasPrevistas > 0)) {
                hrPrev.lancamentoCorreto = false;
            }

            if (moment(hrPrev.data).format('L') == moment(this.dataAtual).format('L')) {
              paginaDataAtual = pagina - 1;
              ss.todayPage = paginaDataAtual;
            }

            if (moment(hrPrev.data).format('L') == moment(this.dataAtual).format('L') &&
              (this.horaAtual < this.horaPermitir || 
                (this.horaAtual == this.horaPermitir && this.minutoAtual <= this.minutoPermitir)) ) {
              hrPrev.permitirLancamento = true;
            } else {
              hrPrev.permitirLancamento = false;
            }

            hrPrev.oldQtdHorasLancadas = hrPrev.horasLancadas;
            paginacao.horasPrevista.push(hrPrev);
            
            oldPagina = pagina;
            oldData = hrPrev.data;

            if (weekNumber == 6) {
              hrDisp.paginacaoHorasPrev.push(paginacao);
              pagina++;
              
              paginacao = this.iniciarNovaPagina(pagina);
            }            
          }
          if (weekNumber < 6) {          
            this.preencherDatasPosteriores(weekNumber,paginacao,oldData);

            hrDisp.paginacaoHorasPrev.push(paginacao);
          }

          this.sortPaginacao(hrDisp.paginacaoHorasPrev);
          ss.selectedPage = paginaDataAtual;          
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

    /*if (noMorePages) {      
      alert("Nao ha mais paginas");
    }*/
  }

  previousPage(ss:Ss): void {
    let noMorePages:boolean = false;

    let page:number = ss.selectedPage - 1;
    if (page >= 0) {
      ss.selectedPage--;
    } else {
      noMorePages = true;
    }

    /*if (noMorePages) {      
      alert("Nao ha mais paginas");
    }*/
  }

  lancarHoras(ss:Ss):void {
    if (!ss.permitirSalvar) {
      alert("Horas lancadas nao podem ser negativas ou maiores que o total disponivel.");
      return;
    }

    this.ssService.lancarHoras(ss).subscribe(
      data => {
        console.log(data);
        alert("Salvo com sucesso !")
      },
      error => {
        console.log("ERROR:", error);
      }
    );
  }
}
