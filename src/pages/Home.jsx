import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


import EditButton from '../components/EditButton';
import LikeButton from '../components/LikeButton';

// import icon from '../assets/icon-left-font.png';
import thumbUp from '../assets/thumbs-up.png';
import thumbDown from '../assets/thumb-down.png';

import '../styles/Home.css'


function Home(props) {

    const { isAuthed, postsData} = props;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwt');
    let canModify = false
    try {
        const decoded = jwt_decode(token);
        if (decoded.isAdmin === true) {
            canModify = true
        }
    } catch (error) {
        console.log(error);
    };

    return isAuthed ? (
        <section className='feed'>
            {postsData.length > 0 ? postsData.map((data, id) => {
                if (userId === data.userId || canModify === true) {
                    return (
                        <div key={id} className='postCard'>
                            <div>
                                <EditButton postId={data._id} />
                                <img alt="image de la publication" src={data.imageUrl} className='img-postCard'></img>
                            </div>
                            <p className='content-postCard'>{data.content}</p>
                            <LikeButton postId={data._id} likes={data.likes} />
                        </div>
                    )
                } else {
                    return (
                        <div key={id} className='postCard'>
                            <div>
                                <img alt="image de la publication" src={data.imageUrl} className='img-postCard'></img>
                            </div>
                            <p className='content-postCard'>{data.content}</p>
                            <LikeButton postId={data._id} likes={data.likes} />
                        </div>
                    )
                }
            }) :
                <section>
                    <h1>Pas de post à afficher</h1>
                </section>}
        </section>
    ) : (<Navigate replace to={"login"} />)

}


export default Home;