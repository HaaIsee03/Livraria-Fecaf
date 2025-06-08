import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivrosComponent } from './pages/livros/livros.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CadastrarAtualizarLivrosComponent } from './pages/cadastrar-atualizar-livros/cadastrar-atualizar-livros.component';
import { ExcluirLivrosComponent } from './pages/excluir-livros/excluir-livros.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'livros', component: LivrosComponent },
  { path: 'livros/cadastrar', component: CadastrarAtualizarLivrosComponent },
  { path: 'livros/editar/:id', component: CadastrarAtualizarLivrosComponent },
  { path: 'livros/excluir/:id', component: ExcluirLivrosComponent },
  { path: 'sobre', component: SobreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
