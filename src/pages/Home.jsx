import React from 'react';
import { Navigate } from 'react-router-dom';

import like from '../API/likeDislike'

import EditButton from '../components/EditButton';

import icon from '../assets/icon-left-font.png';
import thumbUp from '../assets/thumbs-up.png';
import thumbDown from '../assets/thumb-down.png';

import '../styles/Home.css'

function Home(props) {

    const { isAuthed, postsData } = props;

    return isAuthed ? (
        <section className='feed'>
            {postsData.length > 0 ? postsData.map((data, id) => {
                console.log(data);
                return (
                    <div key={id} className='postCard'>
                        <div>
                            <EditButton postId={data._id} />
                            <img src={data.imageUrl} className='img-postCard'></img>

                        </div>
                        <p className='content-postCard'>{data.content}</p>
                        <div className='thumb-container'>
                            <span className='thumbs'>
                                <img src={thumbUp} className='thumb-icon' onClick={like()}></img>
                                <p>{data.likes}</p>
                            </span>
                            <span className='thumbs'>
                                <img src={thumbDown} className='thumb-icon'></img>
                                <p>{data.dislikes}</p>
                            </span>

                        </div>

                    </div>
                )
            }): 
            <section>
                <h1>Pas de post à afficher</h1>
            </section>}
        </section>
    ) : (<Navigate replace to={"login"} />)

}


export default Home;