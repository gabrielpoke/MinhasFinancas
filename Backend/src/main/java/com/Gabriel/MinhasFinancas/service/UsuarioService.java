package com.Gabriel.MinhasFinancas.service;

import com.Gabriel.MinhasFinancas.model.entity.Usuario;

public interface UsuarioService {

    Usuario autenficar(String email, String senha);

    Usuario salvarUsuario(Usuario usuario);

    void validarEmail(String email);
}
