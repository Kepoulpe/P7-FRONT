import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// import like from '../API/likeDislike'

import EditButton from '../components/EditButton';

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
                            <div className='thumb-container'>
                                <span className='thumbs'>
                                    <img alt="icon de pouce en l'air" src={thumbUp} className='thumb-icon'></img>
                                    <p>{data.likes}</p>
                                </span>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={id} className='postCard'>
                            <div>
                                <img alt="image de la publication" src={data.imageUrl} className='img-postCard'></img>
                            </div>
                            <p className='content-postCard'>{data.content}</p>
                            <div className='thumb-container'>
                                <span className='thumbs'>
                                    <img alt="icon de pouce en l'air" src={thumbUp} className='thumb-icon'></img>
                                    <p>{data.likes}</p>
                                </span>
                            </div>

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