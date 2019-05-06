import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../classes/funcionario';
import { UserService } from '../core/user/user.service';


@Injectable()
export class FuncionarioService {  

    constructor(private http: HttpClient, private userService: UserService) { }

    httpHeader = {
        headers: new HttpHeaders({
         'Authorization': "Bearer " + this.userService.getTokenClean()
        }),
        withCredentials: true
       };

    fetchFuncionarios(): Observable<Object> {
        return this.http.get('http://localhost:8080/desafio-luco/funcionarios/listfuncionarios/semsquad', this.httpHeader);
    }

    listarFuncionarios(): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>('http://localhost:8080/desafio-luco/admin/funcionarios/list', this.httpHeader);
    }

    deletar(funcional: number) {
        return this.http.delete('http://localhost:8080/desafio-luco/protected/funcionarios/deletebyid?idFuncional='+funcional, this.httpHeader) ;
    }

    listarFuncionariosByEmail(email:String): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>('http://localhost:8080/desafio-luco/protected/funcionarios/listbyemail?email='+ email , this.httpHeader);
    }

    // OK
    cadastrarFuncionarioPorAdmin(funcionario:Funcionario): Observable<Funcionario> {
        return this.http.post<Funcionario>('http://localhost:8080/desafio-luco/admin/funcionarios/save', funcionario, this.httpHeader );
    }

    cadastrarFuncionarioPorLider(funcionario:Funcionario): Observable<Funcionario> {
        return this.http.post<Funcionario>('http://localhost:8080/desafio-luco/protected/funcionarios/save', funcionario, this.httpHeader );
    }

}