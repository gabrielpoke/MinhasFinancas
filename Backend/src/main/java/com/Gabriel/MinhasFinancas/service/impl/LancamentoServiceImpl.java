package com.Gabriel.MinhasFinancas.service.impl;

import com.Gabriel.MinhasFinancas.model.entity.Lancamento;
import com.Gabriel.MinhasFinancas.model.enums.StatusLancamento;
import com.Gabriel.MinhasFinancas.model.repository.LancamentoRepository;
import com.Gabriel.MinhasFinancas.service.LancamentoService;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class LancamentoServiceImpl implements LancamentoService {

    private LancamentoRepository repository;

    public LancamentoServiceImpl(LancamentoRepository repository){
        this.repository = repository;
    }

    @Override
    @Transactional
    public Lancamento salvar(Lancamento lancamento) {
        return repository.save(lancamento);
    }

    @Override
    @Transactional
    public Lancamento atualizar(Lancamento lancamento) {
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
}
