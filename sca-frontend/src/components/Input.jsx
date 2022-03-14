import React from 'react'
import { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
    const { name, label, error, ...rest } = props

    const hasError = !!error

    return (
        <div className="mb-5">
            <div className="mb-1">
                <label htmlFor="name">{label}</label>
            </div>
            <input name={name} id={name} className={`form-input ${hasError && 'invalid'}`} {...rest} ref={ref} />
            {hasError && <div className="invalid-feedback">{error}</div>}
        </div>
    )
})

export default Input