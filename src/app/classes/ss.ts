import { Squads } from "./squads";
import { HorasDisponiveis } from "./horasdisponiveis";

export class Ss {
    ssId: number;
    descricao:String;
    totalHoras: number;
    horasRestantes: number;
    dataInicio: Date;
    dataTermino: Date;
    squad: Squads;
    forLider: boolean;
    horasDisponiveis: HorasDisponiveis[] = [];
    enable:boolean;

    //Nao e vinculado ao banco de dados {
      // Numero Pagina selecionada - 1 (Exemplo pagina 1 sera gravada como 0)      
      selectedPage:number = 0; 
      todayPage:number = 0; 
      permitirSalvar:boolean;
    // }
  
  
    CadastroSSViewModel() {
  
    }
  }