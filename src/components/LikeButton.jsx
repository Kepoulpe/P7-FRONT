import React from "react";
import likeOnePostAPI from '../API/likeOnePostAPI';

import thumbUp from '../assets/thumbs-up.png';

function LikeButton(props) {

    const { postId, likes } = props;

    const likeOnePost = () => {
        try {
          likeOnePostAPI(postId)
        } catch (error) {
          console.log(error);
        }
    };

    return(
      <div className='thumb-container'>
          <span className='thumbs'>
              <img onClick={likeOnePost} alt="icon de pouce en l'air" src={thumbUp} className='thumb-icon'></img>
              <p>{likes}</p>
          </span>
      </div>
    )
        
}

export default LikeButton;