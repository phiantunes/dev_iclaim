import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../classes/funcionario';
import { UserService } from '../core/user/user.service';


@Injectable()
export class LiderTecnicoService {

    constructor(private http: HttpClient, private userService:UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    fetchLideres(): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>('http://localhost:8080/desafio-luco/admin/funcionarios/listlideres' , this.httpHeader);
    }
}