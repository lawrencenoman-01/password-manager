/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from './home.module.scss'
import Password from '../../assets/password.png'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {
    const [dataPassword, setDataPassword] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        fetch('http://localhost:3000/password')
            .then((res) => res.json())
            .then((data) => {
                setDataPassword(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error Fetching Data: ', err)
                setError(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])
    console.log(dataPassword);

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/password/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (res.ok) {
                    fetchData()
                }
            })
            .catch((err) => {
                console.error('Error to Delete Data: ', err)
            })
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1> All Data Account </h1>
                <div className={styles.container__card}>
                    {dataPassword.map((item, index) => (
                        <>
                            <div className={styles.container__card__content} key={index}>
                                <img src={Password} className={styles.content__image} />
                                <p> {item.provider} </p>
                                <p> {item.email} </p>
                                <p> {item.category} </p>
                                <div className={styles.content__button}>
                                    <Link to={`/detailUser/${item.id}`}>
                                        <button> Details </button>
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)}> Delete </button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
