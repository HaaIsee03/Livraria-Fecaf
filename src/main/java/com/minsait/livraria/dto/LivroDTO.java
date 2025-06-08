package com.minsait.livraria.dto;

import com.minsait.livraria.entity.Livro;

public class LivroDTO {

	private String titulo;
	private Integer ano;
	private Integer quantidade;
	
	public LivroDTO() {
		
	}
	
	public static LivroDTO retornaLivro(Livro livro) {
		LivroDTO livroDTO = new LivroDTO(livro.getTitulo(), livro.getAno(), livro.getQuantidade());
		return livroDTO;
		
	}
	
	public static Livro retornaLivro(LivroDTO livroDTO) {
		Livro livro = new Livro(livroDTO.getTitulo(), livroDTO.getAno(), livroDTO.getQuantidade());
		return livro;
		
	}
	

	public LivroDTO(String titulo, Integer ano, Integer quantidade) {
		super();
		this.titulo = titulo;
		this.ano = ano;
		this.quantidade = quantidade;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Integer getAno() {
		return ano;
	}

	public void setAno(Integer ano) {
		this.ano = ano;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}
	
	
	
}
