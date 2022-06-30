import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'
import * as menssages from '../../components/toastr'

class ConsultaLancamento extends React.Component {
  state = {
    ano: '',
    mes: '',
    tipo: '',
    descricao: '',
    lancamentos: []
  }

  constructor() {
    super()
    this.service = new LancamentoService()
  }

  buscar = () => {
    if (!this.state.ano) {
      menssages.mensagemErro('O preenchimento do campo Ano é orbigatorio')
    }

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }

    this.service
      .consultar(lancamentoFiltro)
      .then(reposta => {
        this.setState({ lancamentos: reposta.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  editar = id => {
    console.log('editando o lancamento', id)
  }

  deletar = id => {
    console.log('deletando o lancamento', id)
  }

  render() {
    const meses = this.service.obterListaMeses()

    const tipos = this.service.obterListaTipo()

    return (
      <>
        <Card title="Consulta Lançamentos">
          <div className="row">
            <div className="col-md-6">
              <div className="bs-component">
                <FormGroup label="Ano: *" htmlFor="inputAno">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAno"
                    value={this.state.ano}
                    onChange={e => this.setState({ ano: e.target.value })}
                    placeholder="Digite o Ano"
                  />
                </FormGroup>

                <FormGroup label="Descrição:" htmlFor="inputDesc">
                  <input
                    type="text"
                    className="form-control"
                    id="inputDesc"
                    value={this.state.descricao}
                    onChange={e => this.setState({ descricao: e.target.value })}
                    placeholder="Digite o descricao"
                  />
                </FormGroup>

                <FormGroup label="Mês:" htmlFor="inputMes">
                  <SelectMenu
                    id="inputMes"
                    value={this.state.mes}
                    onChange={e => this.setState({ mes: e.target.value })}
                    className="form-control"
                    lista={meses}
                  />
                </FormGroup>

                <FormGroup label="Tipo Lançamento:" htmlFor="inputTipo">
                  <SelectMenu
                    id="inputTipo"
                    value={this.state.tipo}
                    onChange={e => this.setState({ tipo: e.target.value })}
                    className="form-control"
                    lista={tipos}
                  />
                </FormGroup>

                <button
                  onClick={this.buscar}
                  type="button"
                  className="btn btn-success"
                >
                  Buscar
                </button>

                <button type="button" className="btn btn-danger">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="bs-component">
                <LancamentosTable
                  lancamentos={this.state.lancamentos}
                  deleteAction={this.deletar}
                  editarAction={this.editar}
                />
              </div>
            </div>
          </div>
        </Card>
      </>
    )
  }
}

export default withRouter(ConsultaLancamento)
