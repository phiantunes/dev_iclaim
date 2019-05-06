import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './core/user/user.service';
import { Token } from './classes/token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projeto Itaú';

  token$: Observable<Token>;

  constructor(private userService:UserService, private router: Router) { 
      this.token$ = this.userService.getUser();
  }
}
