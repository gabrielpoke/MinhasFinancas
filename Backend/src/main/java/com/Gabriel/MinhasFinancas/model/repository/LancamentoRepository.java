package com.Gabriel.MinhasFinancas.model.repository;

import com.Gabriel.MinhasFinancas.model.entity.Lancamento;
import com.Gabriel.MinhasFinancas.model.enums.StatusLancamento;
import com.Gabriel.MinhasFinancas.model.enums.TipoLancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

    @Query(value = "SELECT SUM(l.valor) FROM Lancamento l join l.usuario u " +
            "WHERE u.id = :idUsuario and l.tipo = :tipo and l.status = :status GROUP BY u")
    BigDecimal obterSaldoPorTipoLancamentoEUsuarioEStatus(@Param("idUsuario") Long idUsuario, @Param("tipo") TipoLancamento tipo, @Param("status") StatusLancamento status);
}
