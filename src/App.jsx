import React, {useEffect, useState} from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";

import Banner from './components/Banner';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Home from './pages/Home';

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
      if (isAuthedEffect && APICall.status == 200) {
        setIsAuthed(true);
      }
    }
    if (jwt != null) {
      checkJWT()
      .catch(console.error);
    }
    return () => isAuthedEffect = false;
  }, []);

  return (
    <div>
      {/* TODO display a "create post" button if authed */}
      <Banner />
      <div className='gpm-form'>
        {/* TODO refactor to only include link for login/signup in respective login/signup components */}
        {/* <SwitchButtons /> */}
        <Routes>
          {/* TODO main view should only be accessible when authenticated */}
          <Route path="/" element={<Home isAuthed={isAuthed}/>} />
          <Route path="login" element={<LoginForm isAuthed={isAuthed}/>} />
          <Route path="signup" element={<SignupForm />} />
          {/* TODO 404 */}
        </Routes>
        {/* <LoginForm />
        <SignupForm /> */}
      </div>
    </div>
  )
};

export default App;