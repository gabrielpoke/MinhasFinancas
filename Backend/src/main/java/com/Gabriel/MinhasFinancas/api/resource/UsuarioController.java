package com.Gabriel.MinhasFinancas.api.resource;

import com.Gabriel.MinhasFinancas.api.dto.UsuarioDto;
import com.Gabriel.MinhasFinancas.exception.ErroAutenticacao;
import com.Gabriel.MinhasFinancas.exception.RegraNegocioException;
import com.Gabriel.MinhasFinancas.model.entity.Usuario;
import com.Gabriel.MinhasFinancas.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private UsuarioService service;

    public UsuarioController( UsuarioService service){
        this.service = service;
    }

    @PostMapping("/autenticar")
    public ResponseEntity autentificar(@RequestBody UsuarioDto dto){
        try {
            Usuario usuarioAtentificado = service.autenficar(dto.getEmail(), dto.getSenha());
            return ResponseEntity.ok(usuarioAtentificado);

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
