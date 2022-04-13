package com.Gabriel.MinhasFinancas.api.resource;

import com.Gabriel.MinhasFinancas.api.dto.LancamentoDTO;
import com.Gabriel.MinhasFinancas.exception.RegraNegocioException;
import com.Gabriel.MinhasFinancas.model.entity.Lancamento;
import com.Gabriel.MinhasFinancas.model.entity.Usuario;
import com.Gabriel.MinhasFinancas.model.enums.StatusLancamento;
import com.Gabriel.MinhasFinancas.model.enums.TipoLancamento;
import com.Gabriel.MinhasFinancas.service.LancamentoService;
import com.Gabriel.MinhasFinancas.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lancamentos")
public class LancamentoController {

    private LancamentoService service;
    private UsuarioService usuarioService;

    public LancamentoController(LancamentoService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity salvar(@RequestBody LancamentoDTO lancamentoDTO){

    }

    private Lancamento converter(LancamentoDTO dto){
        Lancamento lancamento = new Lancamento();
        lancamento.setDescricao(dto.getDescricao());
        lancamento.setAno(dto.getAno());
        lancamento.setMes(dto.getMes());
        lancamento.setValor(dto.getValor());

        /*VERIFICA POR ID SE O USUÁRIO EXISTE CASO NÃO EXISTE ELE RETORNA UMA EXCEPTION*/
        Usuario usuario = usuarioService.obterPorId(dto.getId())
                .orElseThrow(()-> new RegraNegocioException("Usuário não encontrado para Id informado"));
        lancamento.setUsuario(usuario);

        /*PEGA O VALOR QUE FOI DESCRITO PASSADO PELO USUÁRIO E COMPARA COM OS ENUMS EXISTENTES*/
        lancamento.setTipo(TipoLancamento.valueOf(dto.getTipo()));
        lancamento.setStatus(StatusLancamento.valueOf(dto.getStatus()));

        return lancamento;
    }
}
