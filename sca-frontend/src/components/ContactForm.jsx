import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useIMask } from 'react-imask';
import { BiLoaderAlt } from 'react-icons/bi'
import Input from './Input'

const initialData = {
    name: '',
    email: '',
    telp: ''
}

const ContactForm = (props) => {
    const { editMode, data, onSubmit } = props

    const [formData, setFormData] = useState(initialData)
    const [errorsForm, setErrorsForm] = useState(initialData)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const nameRef = useRef(null)

    const [telpOpts, setTelpOpts] = useState({
        mask: '(+{62}) 000-0000-000000',
    })

    const { ref: telpRef,
        unmaskedValue: telp,
        setValue: setTelp,
        value: telpRaw
    } = useIMask(telpOpts)

    const inputChangeHandler = event => {
        if (event.target.name === 'telp') {
            setFormData(prev => ({
                ...prev,
                telp: telp
            }))

            return;
        }

        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const submitHandler = event => {
        event.preventDefault()
        const errors = {
            name: '',
            email: '',
            telp: ''
        }

        if (formData.name.trim() === '') errors.name = 'Name must not be empty'
        else if (formData.name.trim().length > 50) errors.name = 'Name must be less than or equal 50 characters'

        const emailRgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (formData.email.trim() === '') errors.email = 'Email must not be empty'
        else if (!emailRgx.test(formData.email.trim())) errors.email = 'Invalid email address format'

        if (formData.telp.trim() === '') errors.telp = 'Telp must not be empty'
        else if (formData.telp.trim().length < 12) errors.telp = 'Telp must be at least 11 characters'
        else if (formData.telp.trim().length > 15) errors.telp = 'Telp must be less than or equal to 14 characters'

        if (errors.name || errors.email || errors.telp) {
            setErrorsForm(errors)
        } else {
            setIsSubmitting(true)
            setErrorsForm(initialData)
            onSubmit(formData, () => {
                if (!editMode) {
                    setFormData(initialData)
                    setTelp('')
                    nameRef.current.focus()
                }
            }, errs => {
                setErrorsForm(errs)
            }, () => {
                setIsSubmitting(false)
            })
        }
    }

    useEffect(() => {
        if (editMode && data) {
            setFormData({
                name: data.name,
                email: data.email,
                telp: data.telp
            })
            setTelp(data.telp)
        }

    }, [editMode, data, setTelp])

    return (
        <form onSubmit={submitHandler}>
            <Input
                ref={nameRef}
                type="text"
                name="name"
                label="Name"
                value={formData.name}
                onChange={inputChangeHandler}
                error={errorsForm.name}
            />

            <Input
                type="text"
                name="email"
                label="Email"
                value={formData.email}
                onChange={inputChangeHandler}
                error={errorsForm.email}
            />

            <Input
                type="text"
                name="telp"
                label="Telp."
                ref={telpRef}
                placeholder="(+62) "
                onChange={inputChangeHandler}
                error={errorsForm.telp}
            />

            <div className="flex justify-end mt-8">
                <Link to="/contacts" className="btn neutral mr-5">
                    Back
                </Link>
                <button className="btn black">
                    {isSubmitting && <BiLoaderAlt className="animate-spin" />}
                    {!isSubmitting && editMode && 'Update'}
                    {!isSubmitting && !editMode && 'Create'}
                </button>
            </div>
        </form>
    )
}

export default ContactForm