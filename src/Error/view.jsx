import React from 'react'

export default props => {
  if (props.error === '') {
    return null
  }
  return (
    <div className='error-message'>
      <div className='error-message-text'>{props.error}</div>
      <br />
      <button onClick={props.clearError}>OK</button>
    </div>
  )
}
