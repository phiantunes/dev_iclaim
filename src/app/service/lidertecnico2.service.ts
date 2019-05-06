import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';


@Injectable()
export class LiderTecnicoService2 {

    constructor(private http: HttpClient, private userService:UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    fetchLideres(): Observable<any> {
        return this.http.get<Object[]>('http://localhost:8080/desafio-luco/admin/funcionarios/listlideres' , this.httpHeader);
    }
}