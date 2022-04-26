import React from 'react'

const ErrorMessage = ({ message, errorState }) => {
  if (message === null) {
    return null
  }
  if (errorState === false) {
    return (
      <div className="info">
        {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}
export default ErrorMessage