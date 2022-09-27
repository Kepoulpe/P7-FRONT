import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

import getOnePostAPI from '../API/getOnePost';



function EditPost(props) {

  let params = useParams();
  let post = [];
  const postId = params.postId;
  const { isAuthed, postsData, canModify } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [postData, setPostData] = useState([]);

  // async function getOnePost(postId) {
  //   try {
  //     const response = await getOnePostAPI(postId)
  //     setPostData(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // getOnePost(postId);
  // console.log(postData);
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

  console.log(postData.imageUrl);

  return isAuthed ? (
    <section id='login-form'>
      <form onSubmit={" "} className='form'>
        <h1>Modifer le poste</h1>
        <div>
          <input
            placeholder={postData.content}
            type="text"
            autoComplete="on"
            defaultValue={postData.content}
            {...register("content", { required: false})} />
        </div>
        <div>
          <input
            id='fileInput'
            placeholder="Image"
            type="file"
            defaultValue={postData.imageUrl}
            {...register("imageUrl", { required: false })} />
        </div>
        <button>Modifier</button>
      </form>
    </section>
  ) : (<Navigate replace to={"/login"} />)
};

export default EditPost