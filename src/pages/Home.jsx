import React from 'react';
import { Navigate } from 'react-router-dom';

import icon from '../assets/icon-left-font.png';

function Home(props) {

    const { isAuthed, postsData } = props;
    
    // TODO display list of posts here
    return isAuthed ? (
        <section className='feed'>
            <div className='postCard'>
                <img src={icon} className='img-postCard'></img>
                <p className='content-postCard'>Contenu de la publication</p>
            </div>
        </section>
    ) : (<Navigate replace to={"login"} />)
}

export default Home;