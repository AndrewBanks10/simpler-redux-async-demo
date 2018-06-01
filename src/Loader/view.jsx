import React from 'react'

export default (props) => {
  if (props.isBusy) {
    return <div className='loader' />
  } else {
    return null
  }
}
