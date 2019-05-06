import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';


@Injectable()
export class SquadByLiderService {

    constructor(private http: HttpClient, private userService:UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    PegarSquad(idFuncional): Observable<any> {
        return this.http.get<Object[]>('http://localhost:8080/desafio-luco/admin/squads/listsquadsbylider?idLider='+idFuncional , this.httpHeader);
    }

    PegarSquadByEmail(email: String): Observable<any> {
        return this.http.get<Object[]>('http://localhost:8080/desafio-luco/protected/squads/listbyemail?email='+email , this.httpHeader);
    }

}