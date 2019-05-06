import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { UserService } from "../user/user.service";

// TODO: USAR URL CERTA
const API_URL = 'http://localhost:8080';

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor(
        private http: HttpClient,
        private userService: UserService){}

    authenticate(email: string, senha: string){
        return this.http
        .post(API_URL + '/login', {email, senha}, {observe: 'response', responseType: 'text'})
        .pipe(tap(res => {
            const authToken = res.body;
            
            this.userService.setToken(authToken);
            this.userService.setTokenClean(authToken);
            
        },
        err =>{
            console.log(err);
        }));
    }

}