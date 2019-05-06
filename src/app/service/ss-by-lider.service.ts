import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';


@Injectable()
export class SSByLiderService {

    constructor(private http: HttpClient, private userService:UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    PegarSS(idFuncional): Observable<any> {
        return this.http.get<Object[]>('http://localhost:8080/desafio-luco/protected/ss/listssbylider?idLider='+idFuncional , this.httpHeader);
    }

}