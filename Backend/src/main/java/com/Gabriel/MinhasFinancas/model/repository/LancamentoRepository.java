package com.Gabriel.MinhasFinancas.model.repository;

import com.Gabriel.MinhasFinancas.model.entity.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {
}
