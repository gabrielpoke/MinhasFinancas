import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import * as menssages from '../../components/toastr'

import { withRouter } from 'react-router-dom'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends React.Component {
  state = {
    id: null,
    descricao: '',
    valor: '',
    mes: '',
    ano: '',
    tipo: '',
    status: '',
    usuario: null,
    atualizando: false
  }

  constructor() {
    super()
    this.service = new LancamentoService()
  }
  componentDidMount() {
    const params = this.props.match.params

    if (params.id) {
      this.service
        .obterPorId(params.id)
        .then(response => {
          this.setState({ ...response.data, atualizando: true })
        })
        .catch(erros => {
          menssages.mensagemErro(erros.response.data)
        })
    }
    console.log('params:', params)
  }

  submit = () => {
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    const { descricao, valor, mes, ano, tipo } = this.state

    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      usuario: usuarioLogado.id
    }

    this.service
      .salvar(lancamento)
      .then(response => {
        this.props.history.push('/consulta-lancamentos')
        menssages.mensagemSucesso('Lançamento cadastrado com sucesso!')
      })
      .catch(error => {
        menssages.mensagemErro(error.response.data)
      })
  }

  atualizar = () => {
    const { descricao, valor, mes, ano, tipo, id, usuario } = this.state

    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      id,
      usuario
    }

    this.service
      .atualizar(lancamento)
      .then(response => {
        this.props.history.push('/consulta-lancamentos')
        menssages.mensagemSucesso('Lançamento atualizado com sucesso!')
      })
      .catch(error => {
        menssages.mensagemErro(error.response.data)
      })
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })
  }

  render() {
    const tipos = this.service.obterListaTipo()
    const meses = this.service.obterListaMeses()

    return (
      <Card
        title={
          this.state.atualizando
            ? 'Atualização de Lançamento'
            : 'Cadastro de Lançamento'
        }
      >
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescricao" label="Descrição: *">
              <input
                id="inputDescricao"
                type="text"
                name="descricao"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.descricao}
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputAno" label="Ano: *">
              <input
                id="inputAno"
                type="text"
                className="form-control"
                name="ano"
                onChange={this.handleChange}
                value={this.state.ano}
              />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup id="inputMes" label="Mês: *">
              <SelectMenu
                id="inputMes"
                lista={meses}
                className="form-control"
                name="mes"
                onChange={this.handleChange}
                value={this.state.mes}
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputValor" label="Valor: *">
              <input
                id="inputValor"
                type="text"
                className="form-control"
                name="valor"
                onChange={this.handleChange}
                value={this.state.valor}
              />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup id="inputTipo" label="Tipo: *">
              <SelectMenu
                id="inputTipo"
                lista={tipos}
                className="form-control"
                name="tipo"
                onChange={this.handleChange}
                value={this.state.tipo}
              />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup id="inputStatus" label="Status: ">
              <input
                type="text"
                className="form-control"
                name="status"
                onChange={this.handleChange}
                value={this.state.status}
                disabled
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {this.state.atualizando ? (
              <button className="btn btn-success" onClick={this.atualizar}>
                Atualizar
              </button>
            ) : (
              <button className="btn btn-success" onClick={this.submit}>
                Salvar
              </button>
            )}

            <button
              className="btn btn-danger"
              onClick={e => this.props.history.push('/consulta-lancamentos')}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(CadastroLancamentos)
