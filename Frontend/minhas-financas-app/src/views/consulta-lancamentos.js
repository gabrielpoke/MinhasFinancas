import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

class ConsultaLancamento extends React.Component {
  render() {
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
                    aria-describedby="emailHelp"
                    placeholder="Digite o Ano"
                  />
                </FormGroup>

                <FormGroup label="Mês:" htmlFor="inputMes">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMes"
                    aria-describedby="emailHelp"
                    placeholder="Digite o Mês"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </Card>
      </>
    )
  }
}

export default withRouter(ConsultaLancamento)
