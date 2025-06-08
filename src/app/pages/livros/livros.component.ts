import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILivro } from 'src/app/interface/livro';
import { LivrosService } from 'src/services/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent {
  livros: ILivro[] = [];
  constructor(private livrosService: LivrosService) {}

  ngOnInit() {
    this.livrosService.buscarTodosLivros().subscribe((result: ILivro[]) => {
      this.livros = result;
    });
  }
}
