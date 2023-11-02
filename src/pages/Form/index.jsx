/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './forms.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Form = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        provider: '',
        email: '',
        password: '',
        category: 'work'
    })

    const [error, setError] = useState({
        provider: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = {};
        let formIsValid = true;

        if (!formData.provider.trim()) {
            validationErrors.provider = 'Provider is required';
            formIsValid = false;
        }

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
            formIsValid = false;
        }

        if (formData.password.trim().length < 6) {
            validationErrors.password = 'Password must be at least 6 characters';
            formIsValid = false;
        }

        setError(validationErrors);

        if (formIsValid) {
            try {
                await axios.post('http://localhost:3000/password', formData)
                
                alert('Data Sent Successfully')
                navigate('/')
            } catch (err) {
                console.error('Error Sending Data', err)
            }
        }
    }

    return (
        <>
            <Navbar />
            <form className={styles.container__form} onSubmit={handleSubmit}>
                <div className={styles.container__form__error}>{error.provider}</div>
                <input className={styles.container__form__input} type='text' name='provider' placeholder='Provider' value={formData.provider} onChange={handleChange} />

                <div className={styles.container__form__error}>{error.email}</div>
                <input className={styles.container__form__input} type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />

                <div className={styles.container__form__error}>{error.password}</div>
                <input className={styles.container__form__input} type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                
                <select className={styles.container__form__select} name="category" value={formData.category} onChange={handleChange}>
                    <option value="work"> Work </option>
                    <option value="family"> Family </option>
                    <option value="personal"> Personal </option>
                </select>
                <button className={styles.container__form__button} type='submit'> Send </button>
            </form>
        </>
    )
}

// "provider": "phincon.com",
//       "email": "mail@phincon.com",
//       "password": "Bethebest123",
//       "category": "work"

export default Form
