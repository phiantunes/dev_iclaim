import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';
import { User } from '../classes/user';


@Injectable()
export class UsuariosService {  

    constructor(private http: HttpClient, private userService: UserService) { }

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };


    // OK
    cadastrarGerente(usuario:User): Observable<User> {
        return this.http.post<User>('http://localhost:8080/desafio-luco/admin/usuarios/save', usuario, this.httpHeader );
    }

}