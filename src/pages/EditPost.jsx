import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

import getOnePostAPI from '../API/getOnePost';



function EditPost(props) {

  let params = useParams();
  const postId = params.postId;
  const { isAuthed, postsData, canModify, updatePostNoImage, updatePostWithImage } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const onSubmitModify = (data) => {
    if (data.file !== undefined) {
      try {
        const formData = new FormData();
        formData.append("imageUrl", data.imageUrl[0]);
        formData.append("content", data.content);
        updatePostWithImage(formData, postId)
      } catch (error) {
        console.log(error);
        return error
      }
    } else {
      try {
        updatePostNoImage(data.content, postId);
      } catch (error) {
        console.error(error);
        return error
      }
    }

  }

  return isAuthed ? (
    <section id='login-form'>
      <form onSubmit={handleSubmit(onSubmitModify)} className='form'>
        <h1>Modifer le poste</h1>
        <div>
          <input
            placeholder={postData.content}
            type="text"
            autoComplete="on"
            defaultValue={postData.content}
            {...register("content", { required: false })} />
        </div>
        <div>
          <input
            id='fileInput'
            placeholder="Image"
            type="file"
            {...register("imageUrl", { required: false })} />
        </div>
        <button>Modifier</button>
      </form>
    </section>
  ) : (<Navigate replace to={"/login"} />)
};

export default EditPost