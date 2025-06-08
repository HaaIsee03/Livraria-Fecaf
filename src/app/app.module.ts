import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LivrosComponent } from './pages/livros/livros.component';
import { FooterComponent } from './components/footer/footer.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CadastrarAtualizarLivrosComponent } from './pages/cadastrar-atualizar-livros/cadastrar-atualizar-livros.component';
// module para requisicao http
import { HttpClientModule } from '@angular/common/http';
// modulo para trabalhar com formularios
import { ReactiveFormsModule } from '@angular/forms';
import { ExcluirLivrosComponent } from './pages/excluir-livros/excluir-livros.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LivrosComponent,
    FooterComponent,
    SobreComponent,
    CadastrarAtualizarLivrosComponent,
    ExcluirLivrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
