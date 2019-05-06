import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Squads } from '../classes/squads';
import { Ss } from '../classes/ss';
import { UserService } from '../core/user/user.service';



@Injectable()
export class SsService {

    constructor(private http: HttpClient, private userService:UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    lancarHoras(ss:Ss): Observable<Ss> {
        return this.http.post<Ss>('http://localhost:8080/desafio-luco/protected/ss/lancarHoras',ss , this.httpHeader);

    }
}