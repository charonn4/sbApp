import React from 'react';
import s from './NavBar.module.css'
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div className={s.nav}>
            <div>
                <Link to={'/create'}>Создание заявок</Link>
            </div>
            <div>
                <Link to={'/authorization'}>Авторизация</Link>
            </div>
            <div>
                <Link to={'/registration'}>Регистрация</Link>
            </div>
        </div>
    );
};

export default NavBar;