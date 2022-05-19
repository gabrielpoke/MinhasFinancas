import React from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
  const options = props.lista.map(option => {
    return <option value={option.value}>{option.label}</option>
  })

  return <select {...props}>{options}</select>
}
