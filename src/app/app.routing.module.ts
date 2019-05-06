import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LogInComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroSSComponent } from './cadastros/cadastro-ss/cadastro-ss.component';
import { CadastroEmployeeComponent } from './cadastros/cadastro-employee/cadastro-employee.component';
import { CadastroSquadComponent } from './cadastros/cadastro-squad/cadastro-squad.component';
import { LancamentoHorasComponent } from './lancamentos/lancamento-horas/lancamento-horas.component';
import { CadastroComunidadeComponent } from './cadastros/cadastro-comunidade/cadastro-comunidade.component';
import { CadastroUserComponent } from './cadastros/cadastro-user/cadastro-user.component';
import { LancamentoGerenteComponent } from './lancamentos/lancamento-gerente/lancamento-gerente.component';
import { RelatorioHorasComponent } from './relatorios/relatorio-horas/relatorio-horas.component';
import { GerenciarComunidadesComponent } from './gerenciar/gerenciar-comunidades/gerenciar-comunidades.component';
import { GerenciarEmployeeComponent } from './gerenciar/gerenciar-employee/gerenciar-employee.component';
import { GerenciarSquadsComponent } from './gerenciar/gerenciar-squads/gerenciar-squads.component';
import { GerenciarUsersComponent } from './gerenciar/gerenciar-users/gerenciar-users.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { AuthGuard } from './core/auth-guard/auth.guard';

const routes: Routes = [
    { path: '', component: LogInComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'new/ss', component: CadastroSSComponent, canActivate: [AuthGuard] },
    { path: 'new/employee', component: CadastroEmployeeComponent, canActivate: [AuthGuard] },
    { path: 'new/squad', component: CadastroSquadComponent, canActivate: [AuthGuard] },
    { path: 'new/hours', component: LancamentoHorasComponent, canActivate: [AuthGuard] },
    { path: 'new/comunidade', component: CadastroComunidadeComponent, canActivate: [AuthGuard] },
    { path: 'new/user', component: CadastroUserComponent, canActivate: [AuthGuard] },
    { path: 'new/hoursmanager', component: LancamentoGerenteComponent, canActivate: [AuthGuard] },
    { path: 'report/hours', component: RelatorioHorasComponent, canActivate: [AuthGuard] },
    { path: 'manage/comunidades', component: GerenciarComunidadesComponent, canActivate: [AuthGuard] },
    { path: 'manage/employee', component: GerenciarEmployeeComponent, canActivate: [AuthGuard] },
    { path: 'manage/squads', component: GerenciarSquadsComponent, canActivate: [AuthGuard] },
    { path: 'manage/users', component: GerenciarUsersComponent, canActivate: [AuthGuard] },
    { path: 'new/comunidade', component: CadastroComunidadeComponent, canActivate: [AuthGuard] },
    { path: 'new/user', component: CadastroUserComponent, canActivate: [AuthGuard] },
    { path: 'new/hoursmanager', component: LancamentoGerenteComponent, canActivate: [AuthGuard] },
    { path: 'report/hours', component: RelatorioHorasComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent} 
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule
        
    ],
    exports: [ RouterModule ]

})

export class AppRoutingModule{}