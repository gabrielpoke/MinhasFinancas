import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import selectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'

class CadastroLancamentos extends React.Component {
  state = {
    id: null,
    descricao: '',
    valor: '',
    mes: '',
    ano: '',
    tipo: '',
    status: ''
  }

  constructor() {
    super()
    this.service = new LancamentoService()
  }

  submit = () => {
    console.log(this.state)
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
      <Card title="Cadastro de Lançamento">
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
            <button className="btn btn-success" onClick={this.submit}>
              Salvar
            </button>
            <button className="btn btn-danger">Cancelar</button>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(CadastroLancamentos)
