package com.Gabriel.MinhasFinancas.model.repository;

import com.Gabriel.MinhasFinancas.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByEmail(String email);

}
