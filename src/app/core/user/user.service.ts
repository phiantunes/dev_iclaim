import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { BehaviorSubject } from "rxjs";
import * as jwt_decode from "jwt-decode";
import { Token } from "src/app/classes/token";

@Injectable({ providedIn: 'root'})
export class UserService {

    private userSubject =  new BehaviorSubject<Token>(null);
    private tokenClean: String = new String();

    constructor(private tokenService: TokenService) {
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token: String) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    setTokenClean(token : String) {
        this.tokenClean = token;
    }

    getTokenClean() {
        return this.tokenClean;
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const user = jwt_decode(this.tokenService.getToken()) as Token;
        this.userSubject.next(user);
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }
    
        getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
    
        if (decoded.exp === undefined) return null;
    
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
    }

}