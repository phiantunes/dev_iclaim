import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Squads } from '../classes/squads';
import { UserService } from '../core/user/user.service';



@Injectable()
export class SquadsService {

    constructor(private http: HttpClient, private userService: UserService) {}

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    fetchSquads(): Observable<Squads[]> {
        return this.http.get<Squads[]>('http://localhost:8080/desafio-luco/admin/squads/list',  this.httpHeader);

    }

    listarSquadsByEmail(email:String): Observable<Squads[]> {
        return this.http.get<Squads[]>('http://localhost:8080/desafio-luco/protected/squads/listbyemail?email='+ email, this.httpHeader);
    }

    // OK
    cadastrarSquadByLider(squad:Squads): Observable<Squads> {
        return this.http.post<Squads>('http://localhost:8080/desafio-luco/protected/squads/save', squad, this.httpHeader );
    }

    cadastrarSquadByGerente(squad:Squads): Observable<Squads> {
        return this.http.post<Squads>('http://localhost:8080/desafio-luco/admin/squads/save', squad, this.httpHeader );
    }
}