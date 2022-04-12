package com.Gabriel.MinhasFinancas.service.impl;

import com.Gabriel.MinhasFinancas.exception.RegraNegocioException;
import com.Gabriel.MinhasFinancas.model.entity.Usuario;
import com.Gabriel.MinhasFinancas.model.repository.UsuarioRepository;
import com.Gabriel.MinhasFinancas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public UsuarioServiceImpl(UsuarioRepository repository){
        super();
        this.repository = repository;
    }

    @Override
    public Usuario autenficar(String email, String senha) {
        return null;
    }

    @Override
    public Usuario salvarUsuario(Usuario usuario) {
        return null;
    }

    @Override
    public void validarEmail(String email) {

        boolean existe = repository.existsByEmail(email);

        if (existe){
            throw new RegraNegocioException("Já existe um usuário cadastrado com este email");
        }
    }
}
