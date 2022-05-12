import React from 'react'

class App extends React.Component {
  state = {
    numero1: null,
    numero2: null,
    resultado: null
  }

  somar = () => {
    const resultado = this.setState({
      resultado: parseFloat(this.state.numero1) + parseFloat(this.state.numero2)
    })
  }

  render() {
    return (
      <div>
        <label>primeiro numero1 : </label>
        <input
          type="text"
          value={this.state.numero1}
          onChange={e => this.setState({ numero1: e.target.value })}
        />
        <label>segundo numero2 : </label>
        <input
          type="text"
          value={this.state.numero2}
          onChange={e => this.setState({ numero2: e.target.value })}
        />
        <button onClick={this.somar}>Somar</button>O resultado é:{' '}
        {this.state.resultado}
      </div>
    )
  }
}

export default App
