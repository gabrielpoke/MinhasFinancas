import React from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import CadastroUsuario from '../views/cadastroUsuario'
import Login from '../views/login'
import Home from '../views/home'
import ConsultaLancamento from '../views/lancamentos/consulta-lancamentos'
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import AuthService from '../app/service/authService'

function RotaAutenticada({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={componentProps => {
        if (AuthService.isUsuarioAutenticado()) {
          return <Component {...componentProps} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
          )
        }
      }}
    />
  )
}

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/cadastro-usuario'} component={CadastroUsuario} />

        <RotaAutenticada path={'/home'} component={Home} />
        <RotaAutenticada
          path={'/consulta-lancamentos'}
          component={ConsultaLancamento}
        />
        <RotaAutenticada
          path={'/cadastro-lancamentos/:id?'}
          component={cadastroLancamentos}
        />
      </Switch>
    </HashRouter>
  )
}

export default Rotas
