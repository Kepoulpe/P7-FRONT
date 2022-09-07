import React, {useEffect, useState} from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";

import Banner from './components/Banner';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Home from './pages/Home';
import CreateNewPost from './pages/CreateNewPost';
import loginUser from './API/loginUser';

function App() {

  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    let isAuthedEffect = true;
    const checkJWT = async () => {
      const APICall = await fetch(`http://localhost:3001/api/auth`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + jwt,
          "Content-Type": "application/json"
        }
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

  async function login(email, password) {
    try {
      const user = await loginUser(email, password);
      setIsAuthed(true);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  function logOut() {
    try {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        setIsAuthed(false);
    } catch (error) {
        console.log(error);
        return
    }
  };

  return (
    <div>
      {/* TODO display a "create post" button if authed */}
      <Banner isAuthed={isAuthed} logOut={logOut}/>
      <div className='gpm-form'>
        <Routes>
          {/* TODO main view should only be accessible when authenticated */}
          <Route path="/" element={<Home isAuthed={isAuthed}/>} />
          <Route path="login" element={<LoginForm isAuthed={isAuthed} login={login}/>} />
          <Route path="signup" element={<SignupForm isAuthed={isAuthed}/>} />
          <Route path="new-post" element={<CreateNewPost isAuthed={isAuthed}/>} />
          {/* TODO 404 */}
        </Routes>
        {/* <LoginForm />
        <SignupForm /> */}
      </div>
    </div>
  )
};

export default App;