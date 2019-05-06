import { Squads } from "./squads";
import { HorasPrevista } from "./horasprevista";

export class Funcionario {
    idFuncional:number;
    nome:String;
    email:String;
    squad:Squads;
    perfil:String;
    horasPrevistas:HorasPrevista[] = [];
  
    Funcionario() {
  
    }
  }