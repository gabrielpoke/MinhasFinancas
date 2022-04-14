package com.Gabriel.MinhasFinancas.api.resource;

import com.Gabriel.MinhasFinancas.api.dto.UsuarioDto;
import com.Gabriel.MinhasFinancas.exception.ErroAutenticacao;
import com.Gabriel.MinhasFinancas.exception.RegraNegocioException;
import com.Gabriel.MinhasFinancas.model.entity.Usuario;
import com.Gabriel.MinhasFinancas.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @PostMapping("/autenticar")
    public ResponseEntity autenticar(@RequestBody UsuarioDto dto){
        try {
            Usuario usuarioAtenticado = service.autenticar(dto.getEmail(), dto.getSenha());
            return ResponseEntity.ok(usuarioAtenticado);

        }catch (ErroAutenticacao e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity salvar(@RequestBody UsuarioDto dto){
        Usuario usuario= Usuario.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(dto.getSenha()).build();

        try{
            Usuario usuarioSalvo = service.salvarUsuario(usuario);
            return new ResponseEntity(usuarioSalvo, HttpStatus.CREATED);
        }
        catch (RegraNegocioException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
