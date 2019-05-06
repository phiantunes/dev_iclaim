import { Injectable } from '@angular/core';
import { Comunidade } from '../classes/comunidade';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../core/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class ComunidadeService {
    
  constructor(private http: HttpClient,  private userService: UserService) { }

  httpHeader = {
    headers: new HttpHeaders({
     'Authorization': "Bearer " + this.userService.getTokenClean()
    }),
    withCredentials: true
   };

  cadastrarComunidade(comunidade:Comunidade): Observable<Comunidade> {
    return this.http.post<Comunidade>('http://localhost:8080/desafio-luco/admin/comunidades/save', comunidade, this.httpHeader);
  }

  listarComunidades(): Observable<Comunidade[]> {
    return this.http.get<Comunidade[]>('http://localhost:8080/desafio-luco/protected/comunidades/list' , this.httpHeader);
  }

  deletar(idComunidade: number) {
    return this.http.delete('http://localhost:8080/desafio-luco/admin/comunidades/deletebyid?idComunidade='+idComunidade, this.httpHeader); 
  }

  buscarComunidade(idComunidade: number): Observable<Comunidade> {
    return this.http.get<Comunidade>('http://localhost:8080/desafio-luco/admin/comunidades/listbyid?id='+idComunidade , this.httpHeader);
  }

  editarComunidade(comunidade: Comunidade): Observable<any> {
    return this.http.put('http://localhost:8080/desafio-luco/admin/comunidades/update', comunidade, this.httpHeader);
  }
}
