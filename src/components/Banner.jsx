import '../styles/components/Banner.css';
import logo from '../assets/icon-left-font-monochrome-white.png';

import React from 'react';
import { Link } from 'react-router-dom';

function Banner(props) {

    const {isAuthed, logOut} = props;

    return isAuthed ? (
        <div className='gpm-banner'>
            <Link to={'/'}><img src={logo} alt='Groupomania' className='gpm-logo' /></Link>
            <button><Link to={'/new-post'}>Nouvelle publication</Link></button>
            <button onClick={logOut} >Déconnexion</button>
        </div>
    ) : 
        < div className='gpm-banner' >
            <img src={logo} alt='Groupomania' className='gpm-logo' />
        </div >
}

export default Banner;