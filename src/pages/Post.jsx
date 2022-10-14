import React, { useState, useEffect } from 'react';
import { Navigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import getOnePostAPI from '../API/getOnePost';
import EditButton from '../components/EditButton';
import LikeButton from '../components/LikeButton';
import jwt_decode from 'jwt-decode';

import '../styles/pages/Post.css'



function Post(props) {

    let params = useParams();
    const postId = params.postId;
    const { isAuthed } = props;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwt');
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getOnePostAPI(postId)
                setPostData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (isAuthed) {
            fetchPost();
        }
    }, []);


    let canModify = false
    try {
        const decoded = jwt_decode(token);
        if (decoded.isAdmin === true) {
            canModify = true
        }
    } catch (error) {
        console.log(error);
    };

    if (userId === postData.userId || canModify === true) {
        return isAuthed ? (
            <section className='feed'>
                <div className='postCard'>
                    <div>
                        <EditButton postId={postData._id} />
                        <img alt="publication" src={postData.imageUrl} className='img-postCard'></img>
                    </div>
                    <p className='content-postCard'>{postData.content}</p>
                    <div>
                        <LikeButton postId={postData._id} likes={postData.likes} />
                    </div>
                </div>
            </section>
        ) : (<Navigate replace to={"/login"} />)
    } else {
        return isAuthed? (
            <div className='postCard'>
                <div>
                    <img alt="publication" src={postData.imageUrl} className='img-postCard'></img>
                </div>
                <p className='content-postCard'>{postData.content}</p>
                <div>
                    <LikeButton postId={postData._id} likes={postData.likes} />
                </div>
            </div>
        ) : (<Navigate replace to={"/login"} />)
    }

}


export default Post;