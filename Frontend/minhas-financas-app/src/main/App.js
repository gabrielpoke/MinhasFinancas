import React from 'react'
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './rotas'

import '../custom.css'
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
