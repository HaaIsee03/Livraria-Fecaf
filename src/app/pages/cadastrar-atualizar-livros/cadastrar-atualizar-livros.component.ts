import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILivro } from 'src/app/interface/livro';
import { LivrosService } from 'src/services/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-livros',
  templateUrl: './cadastrar-atualizar-livros.component.html',
  styleUrls: ['./cadastrar-atualizar-livros.component.css']
})
export class CadastrarAtualizarLivrosComponent {

  livroForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    ano: new FormControl(2000, Validators.required),
    quantidade: new FormControl(0, Validators.required)
  })

  constructor(private livrosService: LivrosService, private route: ActivatedRoute, private router: Router) {}

  livroId = 0;
  ngOnInit() {
    this.livroId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.livroId) {
        this.livrosService.buscarLivroPorId(this.livroId).subscribe((livro: ILivro) => {
            this.livroForm.setValue({
                titulo: livro.titulo,
                ano: livro.ano || 2000,
                quantidade: livro.quantidade || 0
            })
        });
    }
  }

  cadastrarOuEditar() {
    if(this.livroId) {
        this.editar();
    } else {
        this.cadastrar();
    }
  }

  cadastrar() {
    const livro: ILivro = this.livroForm.value as ILivro;
    this.livrosService.cadastrarLivro(livro).subscribe(result => {
        Swal.fire(
          'Tudo certo!',
          'Cadastro realizado com sucesso!',
          'success'
        );
        this.livroForm.setValue({
            titulo: '',
            ano: 2000,
            quantidade: 0
        })
    }, error => {
        console.error(error);
    })
  }

  editar() {
    const livro: ILivro = this.livroForm.value as ILivro;
    this.livrosService.editarLivro(this.livroId, livro).subscribe(result => {
        Swal.fire(
          'Tudo certo!',
          'Edição realizada com sucesso!',
          'success'
        );
        this.router.navigate(['/livros']);
    }, error => {
        console.error(error);
    })
  }
}
