import React from 'react';
import { useNavigate } from 'react-router-dom';

import likeOnePostAPI from '../API/likeOnePostAPI';



import thumbUp from '../assets/icons8-thumbs-up-24.png';

function LikeButton(props) {
  const { postId, likes} = props;
  const navigate = useNavigate();

  async function likeOnePost() {
    try {
      const response = await likeOnePostAPI(postId)
      if (response.success === true){
        navigate("/", { replace: true });
      } else {
        window.alert(response.msg);
      }
    } catch (error) {
      window.alert("Une erreur est servenur merci d'essayer utlérieurement")
      console.log(error);
    }
  };
  return (
    <div className='thumb-container'>
      <span className='thumbs'>
        <img onClick={likeOnePost} alt="icon de pouce en l'air" src={thumbUp} className='thumb-icon'></img>
        <p>{likes}</p>
      </span>
    </div>
  )

}

export default LikeButton;