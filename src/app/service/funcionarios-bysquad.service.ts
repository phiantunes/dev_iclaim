import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';


@Injectable()
export class FuncionariosBySquadService {

    constructor(private http: HttpClient, private userService: UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    fetchFuncionariosBySquad(squadName): Observable<any> {
        return this.http.get('http://localhost:8080/desafio-luco/protected/funcionarios/listfuncionarios/porsquad?squadName=' + squadName, this.httpHeader);
    }
}