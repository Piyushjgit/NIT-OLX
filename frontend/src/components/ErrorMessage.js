import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = ({variant='info',children}) => {
    return (
        <Alert variant={variant}>
            <strong>{children}</strong>
        </Alert>
    )
}

export default ErrorMessage
