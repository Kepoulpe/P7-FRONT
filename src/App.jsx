import React, { useEffect, useState } from 'react';
import './styles/pages/App.css';
import { Routes, Route } from "react-router-dom";

import Banner from './components/Banner';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Home from './pages/Home';
import CreateNewPost from './pages/CreateNewPost';
import Post from './pages/Post';
import loginUser from './API/loginUser';
import createNewPostAPI from './API/createNewPostAPI';
import NotFoundPages from './pages/404';
import EditPost from './pages/EditPost';
import { updatePostNoImageAPI, updatePostWithImageAPI } from './API/updatePost';
import getOnePostAPI from './API/getOnePost';




// container components 
function App() {

  const [isAuthed, setIsAuthed] = useState(false);
  const [postsData, setPostsData] = useState([]);



  useEffect(() => {
    let isAuthedEffect = true;
    const jwt = localStorage.getItem("jwt");
    const checkJWT = async () => {
      const APICall = await fetch(`http://localhost:3001/api/auth`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + jwt,
          "Content-Type": "application/json"
        },
      });
      if (isAuthedEffect && APICall.status === 200) {
        setIsAuthed(true);
      }
    }
    if (jwt != null) {
      checkJWT()
        .catch(console.error);
    }
    return () => isAuthedEffect = false;
  }, []);


  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/posts', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + jwt
          },
        });
        const res = await response.json();
        setPostsData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (isAuthed) {
      fetchPosts();
    }
    return 
  }, [isAuthed, postsData]); // this useEffect hook will only be executed when `isAuthed` state variable changes

  const deletePostFromDisplay = (postId) => {
    const postsDataMinusPost = postsData.filter(post => post._id !== postId);
    setPostsData(postsDataMinusPost);
  }

  async function login(email, password) {
    let user;
    try {
      user = await loginUser(email, password);
      if (user.success === true) {
        localStorage.setItem('jwt', user.data.token);
        localStorage.setItem('userId', user.data.userId);
        setIsAuthed(true);
      } else {
        window.alert(user.msg)
        setIsAuthed(false)
      }
    } catch (error) {
      window.alert("Une erreur est survenue merci d'essayer ultérieurement")
      setIsAuthed(false)
      return;
    }
  }


  function logOut() {
    try {
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      setIsAuthed(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function createNewPost(formData) {
    try {
      const newPostResponse = await createNewPostAPI(formData)
      setPostsData([newPostResponse.data, ...postsData]);
    } catch (error) {
      window.alert("Une erreur est survenue merci d'essayer ultérieurement")
      console.log(error);
    }
  }

  async function updatePostWithImage(postId, formData) {
    try {
      const updatedPostResponse = await updatePostWithImageAPI(postId, formData)
      return updatedPostResponse;
    } catch (error) {
      window.alert("Une erreur est survenue merci d'essayer ultérieurement")
      console.log(error);
    }
  }

  async function updatePostNoImage(postId, content) {
    try {
      const updatedPostResponse = await updatePostNoImageAPI(postId, content)
      return updatedPostResponse;
    } catch (error) {
      window.alert("Une erreur est survenue merci d'essayer ultérieurement")
      console.log(error);
    }
  }

  // async function updatePost ()
  function updatePostLikes(postId) {
    try {
      getOnePostAPI(postId)
    } catch (error) {
      window.alert("Une erreur est survenue merci d'essayer ultérieurement")
      console.log(error);
    }
  }
  






  return (
    <div>
      <Banner isAuthed={isAuthed} logOut={logOut} />
      <div className='gpm-form'>
        <Routes>
          <Route path="/" element={<Home isAuthed={isAuthed} postsData={postsData} updatePostLikes={updatePostLikes}/>} />
          <Route path="login" element={<LoginForm isAuthed={isAuthed} login={login} />} />
          <Route path="signup" element={<SignupForm isAuthed={isAuthed} />} />
          <Route path="new-post" element={<CreateNewPost isAuthed={isAuthed} createNewPost={createNewPost} />} />
          <Route path="edit/:postId" element={<EditPost isAuthed={isAuthed} updatePostNoImage={updatePostNoImage} updatePostWithImage={updatePostWithImage} deletePostFromDisplay={deletePostFromDisplay} />} />
          <Route path="post/:postId" element={<Post isAuthed={isAuthed} updatePostLikes={updatePostLikes} postsData={postsData}/>} />
          <Route path="*" element={<NotFoundPages />} />
        </Routes>
      </div>
    </div>
  )
};
// 
export default App;