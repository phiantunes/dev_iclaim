import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private tokenService: TokenService, private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            if(this.userService.isLogged() && !this.tokenService.isTokenExpired()){
                return true;
            }
            alert("Seu tempo de conexao expirou, se necessario reconecte-se !");
            this.router.navigate(['']);
            return false;
    }
}