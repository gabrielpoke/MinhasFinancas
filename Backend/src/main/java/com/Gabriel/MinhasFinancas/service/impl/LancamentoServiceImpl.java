package com.Gabriel.MinhasFinancas.service.impl;

import com.Gabriel.MinhasFinancas.model.entity.Lancamento;
import com.Gabriel.MinhasFinancas.model.enums.StatusLancamento;
import com.Gabriel.MinhasFinancas.model.repository.LancamentoRepository;
import com.Gabriel.MinhasFinancas.service.LancamentoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LancamentoServiceImpl implements LancamentoService {

    private LancamentoRepository repository;

    public LancamentoServiceImpl(LancamentoRepository repository){
        this.repository = repository;
    }

    @Override
    public Lancamento salvar(Lancamento lancamento) {
        return null;
    }

    @Override
    public Lancamento atualizar(Lancamento lancamento) {
        return null;
    }

    @Override
    public void deletar(Lancamento lancamento) {

    }

    @Override
    public List<Lancamento> buscar(Lancamento lancamentoFiltro) {
        return null;
    }

    @Override
    public void atualizarStatus(Lancamento lancamento, StatusLancamento status) {

    }
}
