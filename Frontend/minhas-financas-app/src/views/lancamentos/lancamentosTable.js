import React from 'react'
import currencyFormatter from 'currency-formatter'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
  const rows = props.lancamentos.map(lancamento => {
    return (
      <tr key={lancamento.id}>
        <td>{lancamento.descricao}</td>
        <td>
          {currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}
        </td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>
          <button
            title="Efetivar"
            disabled={lancamento.status !== 'PENDENTE'}
            onClick={e => {
              props.alterarStatus(lancamento, 'EFETIVADO')
            }}
            type="button"
            className="btn btn-success"
          >
            <i className="pi pi-check" />
          </button>

          <button
            disabled={lancamento.status !== 'PENDENTE'}
            title="Cancelar"
            onClick={e => {
              props.alterarStatus(lancamento, 'CANCELADO')
            }}
            type="button"
            className="btn btn-warning"
          >
            <i className="pi pi-times" />
          </button>

          <button
            title="Editar"
            type="button"
            className="btn btn-primary"
            onClick={e => props.editarAction(lancamento.id)}
          >
            <i className="pi pi-pencil" />
          </button>

          <button
            title="Excluir"
            type="button"
            className="btn btn-danger"
            onClick={e => props.deleteAction(lancamento)}
          >
            <i className="pi pi-trash" />
          </button>
        </td>
      </tr>
    )
  })

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  )
}
