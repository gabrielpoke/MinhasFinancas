import React from 'react'
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './rotas'
import 'toastr/build/toastr.min.js'

import '../custom.css'
import 'toastr/build/toastr.css'
import NavBar from '../components/navBar'
import ProvedorAutenticacao from './provedorAutenticacao'

import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons

class App extends React.Component {
  render() {
    return (
      <ProvedorAutenticacao>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App
