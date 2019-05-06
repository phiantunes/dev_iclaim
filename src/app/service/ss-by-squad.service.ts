import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';


@Injectable()
export class SSBySquadService {

    constructor(private http: HttpClient, private userService:UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    PegarSS(name): Observable<any> {
        return this.http.get<Object[]>('http://localhost:8080/desafio-luco/protected/ss/listssbysquads?name='+name , this.httpHeader);
    }

}