package com.minsait.livraria.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class LivroNaoEncontradoException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public LivroNaoEncontradoException(long id) {
		super(String.format("O id %s nao foi encontrado", id));
	}
	
}
