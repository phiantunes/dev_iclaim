import { Funcionario } from "./funcionario";
import { Ss } from "./ss";
import { HorasPrevista } from "./horasprevista";
import { PaginacaoHorasPrev } from "./PaginacaoHorasPrev";

export class HorasDisponiveis {
    id:number;
    task:number;
    funcionario:Funcionario;
    ss:Ss;
    horasPlanejadas:number;
    horasConsumidas:number;
    horasPrevista:HorasPrevista[];

    //Nao e vinculado ao banco de dados {
      paginacaoHorasPrev:PaginacaoHorasPrev[];   
      oldQtdHorasConsumidas:number;
    // }
  
    HorasDisponiveis() { 
    }
  
  }