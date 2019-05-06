import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HorasPrevista } from '../classes/horasprevista';
import { UserService } from '../core/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class HorasPrevistaService {
    
  constructor(private http: HttpClient, private userService:UserService) { }

  httpHeader = {
    headers: new HttpHeaders({
     'Authorization': "Bearer " + this.userService.getTokenClean()
    }),
    withCredentials: true
   };

  confirmarLancamento(hrPrev: HorasPrevista): Observable<any> {
    return this.http.post('http://localhost:8080/desafio-luco/protected/horasprevista/confirmarlancamento', hrPrev, this.httpHeader);
  }
}
