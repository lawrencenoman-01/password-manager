/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from './navbar.module.scss'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__content}>
                <Link to="/" className={styles.header__content__logo}>
                    Password Manager
                </Link>
                <nav
                    className={`${styles.header__content__nav} ${
                        menuOpen && size.width < 768 ? styles.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                            <Link to="/addForm" onClick={menuToggleHandler}>
                                Forms
                            </Link>
                        </li>
                        <li>
                            <Link to="/work" onClick={menuToggleHandler}>
                                Work
                            </Link>
                        </li>
                        <li>
                            <Link to="/family" onClick={menuToggleHandler}>
                                Family
                            </Link>
                        </li>
                        <li>
                            <Link to="/personal" onClick={menuToggleHandler}>
                                Personal
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.header__content__toggle}>
                    {!menuOpen ? (
                        <MenuRoundedIcon onClick={menuToggleHandler} />
                    ) : (
                        <CloseIcon onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
