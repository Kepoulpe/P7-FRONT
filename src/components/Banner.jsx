import '../styles/components/Banner.css';
import logo from '../assets/icon-left-font-monochrome-white.png';
import plus from '../assets/icons8-plus-24.png';
import logout from '../assets/icons8-déconnexion-50.png';

import React from 'react';
import { Link } from 'react-router-dom';

function Banner(props) {

    const {isAuthed, logOut} = props;

    return isAuthed ? (
        <nav className='gpm-banner-authed'>
            <Link to={'/'}><img src={logo} alt='Groupomania' className='gpm-logo-authed' /></Link>
            <button className='nav-button'><Link to={'/new-post'}><img src={plus} alt='création de post' className='nav-icon' /></Link></button>
            <button className='nav-button' onClick={logOut} ><img src={logout} alt='déconnexion' className='nav icon'/></button>
        </nav>
    ) : 
        < nav className='gpm-banner' >
            <img src={logo} alt='Groupomania' className='gpm-logo' />
        </nav >
}

export default Banner;