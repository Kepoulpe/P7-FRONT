import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";

import Banner from './components/Banner';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Home from './pages/Home';
import CreateNewPost from './pages/CreateNewPost';
import loginUser from './API/loginUser';
import createNewPostAPI from './API/createNewPostAPI';

// container components 
function App() {

  const [isAuthed, setIsAuthed] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [APIError, setAPIError] = useState(false);

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
    let isAuthedEffect = true;
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
        setAPIError(true);
      }
    }
    if (isAuthed) {
      fetchPosts();
    }
    return () => isAuthedEffect = false;
  }, [isAuthed]); // this useEffect hook will only be executed when `isAuthed` state variable changes

  async function login(email, password) {
    try {
      await loginUser(email, password);
      setIsAuthed(true);
    } catch (error) {
      console.error(error);
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
      const newPostResponse= await createNewPostAPI(formData)
      // TODO make sure its sorted chronologically in descending order
      console.log(newPostResponse);
      setPostsData([...postsData, newPostResponse.data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Banner isAuthed={isAuthed} logOut={logOut} />
      <div className='gpm-form'>
        <Routes>
          <Route path="/" element={<Home isAuthed={isAuthed} postsData={postsData} />} />
          <Route path="login" element={<LoginForm isAuthed={isAuthed} login={login} />} />
          <Route path="signup" element={<SignupForm isAuthed={isAuthed} />} />
          <Route path="new-post" element={<CreateNewPost isAuthed={isAuthed} createNewPost={createNewPost} />} />
          {/* TODO 404 */}
        </Routes>
      </div>
    </div>
  )
};
// 
export default App;