import React from 'react'
import { withRouter } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

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
    showConfirmDialog: false,
    lancamentoDeletar: {},
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

  abrirConfirmacao = lancamento => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
  }

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
  }

  deletar = () => {
    this.service
      .deletar(this.state.lancamentoDeletar.id)
      .then(response => {
        const lancamentos = this.state.lancamentos
        const index = lancamentos.indexOf(this.state.lancamentoDeletar)
        lancamentos.splice(index, 1)
        this.setState({ lancamentos: lancamentos, showConfirmDialog: false })

        menssages.mensagemSucesso('Lançamento deletado com sucesso!')
      })
      .catch(error => {
        menssages.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento')
      })
  }

  render() {
    const meses = this.service.obterListaMeses()

    const tipos = this.service.obterListaTipo()

    const ConfirmDialogFooter = (
      <div>
        <Button label="Confirma" icon="pi pi-check" onClick={this.deletar} />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelarDelecao}
        />
      </div>
    )

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
                  deleteAction={this.abrirConfirmacao}
                  editarAction={this.editar}
                />
              </div>
            </div>
          </div>
          <div>
            <Dialog
              header="Confirmação"
              visible={this.state.showConfirmDialog}
              style={{ width: '50vw' }}
              modal={true}
              footer={ConfirmDialogFooter}
              onHide={() => this.setState({ showConfirmDialog: false })}
            >
              <p>Confirma a exclusão deste lançamento ?</p>
            </Dialog>
          </div>
        </Card>
      </>
    )
  }
}

export default withRouter(ConsultaLancamento)
