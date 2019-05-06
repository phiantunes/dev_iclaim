import { HorasDisponiveis } from "./horasdisponiveis";

export class HorasPrevista {
    id:number;
    data:Date;
    horasPrevistas:number;
    horasLancadas:number;
    horasDisponiveis:HorasDisponiveis;   
    lancamentoConfirmado:Boolean;   
    
    //Nao e vinculado ao banco de dados {
      permitirLancamento:Boolean;   
      oldQtdHorasLancadas:number;
      lancamentoCorreto:Boolean;
    // }
    
    constructor(id:number,data:Date,horasPrevistas:number,horasLancadas:number,horasDisponiveis:HorasDisponiveis) {
      this.id = id;
      this.data = data;
      this.horasPrevistas = horasPrevistas;
      this.horasLancadas = horasLancadas;
      this.horasDisponiveis = horasDisponiveis;
      this.lancamentoCorreto = true;
    }
  }