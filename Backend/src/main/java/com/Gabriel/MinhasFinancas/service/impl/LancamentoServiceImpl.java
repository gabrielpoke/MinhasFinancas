package com.Gabriel.MinhasFinancas.service.impl;

import com.Gabriel.MinhasFinancas.exception.RegraNegocioException;
import com.Gabriel.MinhasFinancas.model.entity.Lancamento;
import com.Gabriel.MinhasFinancas.model.enums.StatusLancamento;
import com.Gabriel.MinhasFinancas.model.enums.TipoLancamento;
import com.Gabriel.MinhasFinancas.model.repository.LancamentoRepository;
import com.Gabriel.MinhasFinancas.service.LancamentoService;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LancamentoServiceImpl implements LancamentoService {

    private LancamentoRepository repository;

    public LancamentoServiceImpl(LancamentoRepository repository){
        this.repository = repository;
    }

    @Override
    @Transactional
    public Lancamento salvar(Lancamento lancamento) {
        validar(lancamento);
        lancamento.setStatus(StatusLancamento.PENDENTE);

        return repository.save(lancamento);
    }

    @Override
    @Transactional
    public Lancamento atualizar(Lancamento lancamento) {
        validar(lancamento);

        /*VERIFICA SE OBJETO JA É EXISTENTE CASO NÃO ACUSA UM NULLPOINT*/
        Objects.requireNonNull(lancamento.getId());
        return repository.save(lancamento);
    }

    @Override
    @Transactional
    public void deletar(Lancamento lancamento) {
        /*VERIFICA SE OBJETO JA É EXISTENTE CASO NÃO ACUSA UM NULLPOINT*/
        Objects.requireNonNull(lancamento.getId());
        repository.delete(lancamento);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Lancamento> buscar(Lancamento lancamentoFiltro) {
        /*INTERFACE UTILIZADA PARA REALIZAR BUSCAR */
        Example example = Example.of( lancamentoFiltro, ExampleMatcher.matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) );

        return repository.findAll(example);
    }

    @Override
    public void atualizarStatus(Lancamento lancamento, StatusLancamento status) {
        lancamento.setStatus(status);
        atualizar(lancamento);
    }

    @Override
    public void validar(Lancamento lancamento) {
        if(lancamento.getDescricao() == null || lancamento.getDescricao().trim().equals("")){
            throw new RegraNegocioException("Informe uma descrição válida");
        }
        if(lancamento.getMes() == null|| lancamento.getMes() < 1 || lancamento.getMes() > 12){
            throw  new RegraNegocioException("Informe um mês válido");
        }
        if (lancamento.getAno() == null || lancamento.getAno().toString().length() !=4){
            throw new RegraNegocioException("Informe Ano válido");
        }
        if (lancamento.getUsuario() == null || lancamento.getUsuario().getId() == null){
            throw new RegraNegocioException("Informe um Usuário");
        }
        /*COMPARA VALOR BIGDECIMAL 0, CASO A PESSOA TENTA ADD UM VALOR 0 DISPARA A EXCEPTION*/
        if (lancamento.getValor() == null || lancamento.getValor().compareTo(BigDecimal.ZERO)<1){
            throw new RegraNegocioException("Informe um valor válido");
        }
        if(lancamento.getTipo() == null){
            throw new RegraNegocioException("Informe um tipo de lançamento");
        };
    }

    @Override
    public Optional<Lancamento> obterPorId(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public BigDecimal obterSaldoPorTipoLancamentoEUsuario(Long id) {
        BigDecimal receitas = repository.obterSaldoPorTipoLancamentoEUsuarioEStatus(id, TipoLancamento.RECEITA, StatusLancamento.EFETIVADO);
        BigDecimal despesas = repository.obterSaldoPorTipoLancamentoEUsuarioEStatus(id, TipoLancamento.DESPESA, StatusLancamento.EFETIVADO);

        if(receitas == null){
            receitas = BigDecimal.ZERO;
        }

        if (despesas == null){
            despesas = BigDecimal.ZERO;
        }

        return receitas.subtract(despesas);
    }
}
