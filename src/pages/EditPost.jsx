import React from 'react';
import {useParams } from "react-router-dom";

const EditPost = () => {

let params = useParams();

  return (
    <div>EditPost {params.postId}</div>
  )
}

export default EditPost