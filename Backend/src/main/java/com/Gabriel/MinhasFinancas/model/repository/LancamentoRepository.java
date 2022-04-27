package com.Gabriel.MinhasFinancas.model.repository;

import com.Gabriel.MinhasFinancas.model.entity.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

    @Query(value = "SELECT sum(l.valor) FROM Lancamento l JOIN l.usuario u " +
            "WHERE u.id = :idUsuario AND l.tipo =: tipo GROUP BY u")
    BigDecimal obterSaldoPorTipoLancamentoEUsuario(@Param("idUsuario") Long idUsuario, @Param("tipo") String tipo);
}
