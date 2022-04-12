package com.Gabriel.MinhasFinancas.api.resource;

import com.Gabriel.MinhasFinancas.api.dto.UsuarioDto;
import com.Gabriel.MinhasFinancas.exception.RegraNegocioException;
import com.Gabriel.MinhasFinancas.model.entity.Usuario;
import com.Gabriel.MinhasFinancas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    public UsuarioController(UsuarioService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity salvar(@RequestBody UsuarioDto dto){
        Usuario usuario= Usuario
                .builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .build();

        try{
            Usuario usarioSalvo = service.salvarUsuario(usuario);
            return new ResponseEntity(usarioSalvo, HttpStatus.CREATED);
        }
        catch (RegraNegocioException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
