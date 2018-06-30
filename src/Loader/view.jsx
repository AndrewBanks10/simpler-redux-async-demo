import React from 'react'

export default props => {
  if (props.busyCounter > 0) {
    return <div className='loader' />
  } else {
    return null
  }
}
