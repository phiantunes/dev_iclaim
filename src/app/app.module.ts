import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask'
import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { AppRoutingModule } from './app.routing.module';
import { LogInModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CadastroSSModule } from './cadastros/cadastro-ss/cadastro-ss.module';
import { CadastroEmployeeModule } from './cadastros/cadastro-employee/cadastro-employee.module';
import { CadastroSquadModule } from './cadastros/cadastro-squad/cadastro-squad.module';
import { SquadsService } from './service/squads.service';
import { HeaderModule } from './header/header.module';
import { LiderTecnicoService } from './service/lidertecnico.service';
import { FuncionarioService } from './service/funcionarios.service';
import { LancamentoHorasModule } from './lancamentos/lancamento-horas/lancamento-horas.module';
import { SSBySquadService } from './service/ss-by-squad.service';
import { FuncionariosBySquadService } from './service/funcionarios-bysquad.service';
import { LiderTecnicoService2 } from './service/lidertecnico2.service';
import { SSByLiderService } from './service/ss-by-lider.service';
import { SquadByLiderService } from './service/squad-by-lider.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CadastroComunidadeModule } from './cadastros/cadastro-comunidade/cadastro-comunidade.module';
import { CadastroUserModule } from './cadastros/cadastro-user/cadastro-user.module';
import { LancamentoGerenteModule } from './lancamentos/lancamento-gerente/lancamento-gerente.module';
import { RelatorioHorasModule } from './relatorios/relatorio-horas/relatorio-horas.module';
import { ComunidadeService } from './service/comunidade.service';
import { GerenciarComunidadesModule } from './gerenciar/gerenciar-comunidades/gerenciar-comunidades.module';
import { GerenciarEmployeeModule } from './gerenciar/gerenciar-employee/gerenciar-employee.module';
import { GerenciarSquadsModule } from './gerenciar/gerenciar-squads/gerenciar-squads.module';
import { GerenciarUsersModule } from './gerenciar/gerenciar-users/gerenciar-users.module';
import { PerfilModule } from './usuarios/perfil/perfil.module';
import { SsService } from './service/ss.service';
import { HorasPrevistaService } from './service/horasprevista.service';
import { UsuariosService } from './service/usuarios.service';
import { ExcelService } from './service/ExcelService.service';
import { TokenService } from './core/token/token.service';
import { AuthRequestOptions } from './core/auth-guard/authrequestoptions';
import { RequestOptions } from '@angular/http';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ErrorsModule,
    LogInModule,
    HeaderModule,
    DashboardModule,
    CadastroSSModule,
    CadastroEmployeeModule,
    CadastroSquadModule,
    LancamentoHorasModule,
    CadastroComunidadeModule,
    CadastroUserModule,
    LancamentoGerenteModule,
    RelatorioHorasModule,
    GerenciarComunidadesModule,
    GerenciarEmployeeModule,
    GerenciarSquadsModule,
    GerenciarUsersModule,
    RelatorioHorasModule,
    NgxMaskModule.forRoot(),
    PerfilModule
  
  ],
  providers: [
    SquadsService,
    SquadByLiderService,
    LiderTecnicoService,
    LiderTecnicoService2,
    FuncionarioService,
    SSBySquadService,
    SSByLiderService,
    FuncionariosBySquadService,
    SsService,
    ComunidadeService,
    HorasPrevistaService,
    UsuariosService,
    ExcelService,
    TokenService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: RequestOptions, useClass: AuthRequestOptions } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
