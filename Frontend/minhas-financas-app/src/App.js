import React from 'react'

class App extends React.Component {
  state = {
    nome: 'Mundo'
  }

  render() {
    return <div>Hello {this.state.nome}</div>
  }
}

export default App
