import React from 'react'
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './rotas'
import 'toastr/build/toastr.min.js'

import '../custom.css'
import 'toastr/build/toastr.css'
import NavBar from '../components/navBar'

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )
  }
}

export default App
