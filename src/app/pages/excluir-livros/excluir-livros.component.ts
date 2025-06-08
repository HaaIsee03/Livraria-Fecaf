import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILivro } from 'src/app/interface/livro';
import { LivrosService } from 'src/services/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-excluir-livros',
  templateUrl: './excluir-livros.component.html',
  styleUrls: ['./excluir-livros.component.css']
})
export class ExcluirLivrosComponent {
  livros: ILivro[] = [];
  constructor(private livrosService: LivrosService, private route: ActivatedRoute, private router: Router) {}

  livroId = 0;
  ngOnInit() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Não será possíverl reverter essa ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.livroId = Number(this.route.snapshot.paramMap.get('id'));
        this.livrosService.excluirLivro(this.livroId).subscribe(result => {
            Swal.fire(
            'Tudo certo!',
            'Cadastro excluído com sucesso!',
            'success'
            );
            this.router.navigate(['/livros']);
        }, error => {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado! Verifique o erro no console.'
            })
            console.error(error);
        })

      }
    this.router.navigate(['/livros']);
    });

  }
}
