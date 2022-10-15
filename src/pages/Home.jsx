import React from 'react';
import { Navigate, Link } from 'react-router-dom';

import '../styles/pages/Home.css'


function Home(props) {

    const { isAuthed, postsData } = props;

    return isAuthed ? (
        <section className='feed'>
            {postsData.length > 0 ? postsData.map((data, id) => {
                    return (
                        <div key={id} className='postCard'>
                            <Link to={`post/${data._id}`} className='post-card-link'>
                            <div>
                                <img alt="publication" src={data.imageUrl} className='img-postCard'></img>
                            </div>
                            <div>
                                <p className='content-postCard'>{data.content}</p>
                            </div>
                            </Link>
                        </div>
                    )
            }) :
                <section>
                    <h1>Pas de post à afficher</h1>
                </section>}
        </section>
    ) : (<Navigate replace to={"login"} />)

}


export default Home;