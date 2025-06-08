package com.minsait.livraria.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minsait.livraria.entity.Livro;
import com.minsait.livraria.exception.LivroNaoEncontradoException;
import com.minsait.livraria.repository.LivroRepository;

@Service
public class LivroService {
	
	private LivroRepository livroRepository;

	@Autowired
	public LivroService(LivroRepository livroRepository) {
		
		this.livroRepository = livroRepository;
		
	}
	
	// Cadastrar Livro
	public Livro cadastrarLivro(Livro livro) {
		
		return this.livroRepository.save(livro);
		
	}
	
	// Atualizando Livro
	public Livro atualizarLivro(Long id, @Valid Livro livro) throws LivroNaoEncontradoException {
		
		if(this.livroRepository.existsById(id)) {
			
			Livro LivroASerAlterado = this.livroRepository.findById(id).get();
			
			livro.setId(id);
			
			if(livro.getQuantidade() == null) {
				livro.setQuantidade(LivroASerAlterado.getQuantidade());
			}
			
			if(livro.getAno() == null) {
				livro.setAno(LivroASerAlterado.getAno());
			}
			
			return this.livroRepository.save(livro);
		}
		
		throw new LivroNaoEncontradoException(id);
	}
	
	// Listar todos os Livros
	public List<Livro> exibirTodosOsLivros() {
		return this.livroRepository.findAll();
	}
	
	// Achar Livro por ID
	public Livro exibirLivrosPorId(Long id) throws LivroNaoEncontradoException {
		
		if(this.livroRepository.existsById(id)) {
			return this.livroRepository.findById(id).get();	
		}
		
		throw new LivroNaoEncontradoException(id);
		
	}
	
	// Excluir Livro por ID
	public MensagemDeSucesso excluirLivros(Long id) throws LivroNaoEncontradoException {
		
		if(this.livroRepository.existsById(id)) {
			this.livroRepository.deleteById(id);
			
			MensagemDeSucesso mensagem = new MensagemDeSucesso();
			mensagem.setMensagem("Deletado com sucesso");
			return mensagem;
		}
		
		throw new LivroNaoEncontradoException(id);
		
	}
	
}
