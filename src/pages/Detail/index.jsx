/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from './detail.module.scss'
import Navbar from '../../components/Navbar'
import Background from '../../assets/detail.jpg'
import Icon from '../../assets/icon.png'
import { useParams } from 'react-router-dom'

const Detail = () => {
    const { id } = useParams()
    const [dataPassword, setDataPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/password/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setDataPassword(data)
            })
            .catch((err) => {
                console.error('Error Fetching Data: ', err)
            })
    }, [id])

    console.log(dataPassword);

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.container__card}>
                    <div className={styles.container__card__content}>
                        <img className={styles.icon} src={Icon} />
                        <p className={styles.id}> ID: {id} </p>
                        <p className={styles.title}> {dataPassword?.provider} </p>
                        <p className={styles.title}> {dataPassword?.email} </p>
                        <div className={styles.hidePassword}>
                            <p>
                                {showPassword ? dataPassword?.password : '********'}
                            </p>
                            <button onClick={toggleShowPassword}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <p className={styles.title}> {dataPassword?.category} </p>
                        <img src={Background} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail
