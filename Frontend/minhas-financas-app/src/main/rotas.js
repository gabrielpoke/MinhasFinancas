import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import CadastroUsuario from '../views/cadastroUsuario'
import Login from '../views/login'
import Home from '../views/home'
import ConsultaLancamento from '../views/lancamentos/consulta-lancamentos'
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route path={'/home'} component={Home} />
        <Route path={'/login'} component={Login} />
        <Route path={'/cadastro-usuario'} component={CadastroUsuario} />
        <Route path={'/consulta-lancamentos'} component={ConsultaLancamento} />
        <Route path={'/cadastro-lancamentos'} component={cadastroLancamentos} />
      </Switch>
    </HashRouter>
  )
}

export default Rotas
