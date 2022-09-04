import logo from '../assets/icon-left-font-monochrome-white.png';

import React from 'react';
import { Link } from 'react-router-dom';


function HomeBanner() {
    return (
        <div>
            <header>
                <nav>
                    <Link to='/accueil'>
                        <img src={logo} alt='Groupomania' />
                    </Link>
                    <Link to='/nouveau-post'>
                        <button>Nouvelle publication</button>
                    </Link>
                </nav>
            </header>
        </div>
    )
};

export default HomeBanner;