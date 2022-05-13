import React from 'react'
import 'bootswatch/dist/flatly/bootstrap.css'

import Login from './views/login.js'
import CadastroUsuario from './views/cadastroUsuario.js'
import './custom.css'
class App extends React.Component {
  render() {
    return (
      <div>
        <CadastroUsuario />
      </div>
    )
  }
}

export default App
