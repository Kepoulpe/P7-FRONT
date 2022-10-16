import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import deleteOnePostAPI from '../API/deleteOnePost';
import getOnePostAPI from '../API/getOnePost';

import '../styles/pages/EditPost.css'



function EditPost(props) {

  let params = useParams();
  const postId = params.postId;
  const {
    isAuthed,
    updatePostNoImage,
    updatePostWithImage
  } = props;
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
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

  const onSubmitModify = async (data) => {
    if (data.imageUrl.length > 0) {
      try {
        const formData = new FormData();
        formData.append("imageUrl", data.imageUrl[0]);
        formData.append("content", data.content);
        const response = await updatePostWithImage(postId, formData);
         if (response.success === true) {
          navigate("/", { replace: true });
         }
      } catch (error) {
        window.alert("Une erreur est survenue merci d'essayer ultérieurement")
        console.log(error);
        return error
      }
    } else {
      try {
        const content = data.content
        const response = await updatePostNoImage(postId, content);
        if (response.success === true) {
          navigate("/", { replace: true });
         }
      } catch (error) {
        window.alert("Une erreur est survenue merci d'essayer ultérieurement")
        console.error(error);
        return error
      }
    }
  }

  const deleteOnePost = () => {
    try {
      deleteOnePostAPI(postId);
      navigate("/", { replace: true });
    } catch (error) {
      window.alert("Une erreur est survenue merci d'essayer ultérieurement")
      console.log(error);
    }
  }

  return isAuthed ? (
    <section id='login-form'>
      <form onSubmit={handleSubmit(onSubmitModify)} className='form'>
        <h1>Modifer le poste</h1>
        <div className='input-container'>
          <input
            placeholder={postData.content}
            type="text"
            autoComplete="on"
            defaultValue={postData.content}
            {...register("content", { required: false })} />
        </div>
        <div className='input-container'>
          <input
            id='fileInput'
            placeholder="Image"
            type="file"
            {...register("imageUrl", { required: false })} />
        </div>
        <button className='button'>Modifier</button>
        <p onClick={deleteOnePost} className='delete'>Supprimer le poste</p>
      </form>
    </section>
  ) : (<Navigate replace to={"/login"} />)
};

export default EditPost