import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import icon from '../assets/icon-left-font.png';


function Home(props) {

    const jwt = localStorage.getItem("jwt");

    const { isAuthed } = props;
    const [postsData, setPostsData] = useState([]);
    const [error, setError] = useState(false)


    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('http://localhost:3001/api/posts', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + jwt
                    },
                });
                const { postsData } = await response.json();
                setPostsData(postsData);
            } catch (error) {
                console.log(error);
                setError(true)
            }
        }
        fetchPosts()
    }, [])

    // curl -H "Content-Type: application/json" -H "Authorization: Bearer {token}" -d '{"content": "test", "userId": "{MONGO_UID}"}' http://localhost:3001/api/posts

    return isAuthed ? (
        <section className='feed'>
            <div className='postCard'>
                <img src={icon} className='img-postCard'></img>
                <p className='content-postCard'>Contenue de la publication</p>
            </div>
        </section>
    ) : (<Navigate replace to={"login"} />)
}

export default Home;