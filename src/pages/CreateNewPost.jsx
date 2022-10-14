import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import '../styles/pages/CreateNewPost.css'


function CreateNewPost(props) {

    const { isAuthed, createNewPost } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const createPost = (data) => {
        try {
            const userId = localStorage.getItem('userId')
            const formData = new FormData();
            formData.append("imageUrl", data.imageUrl[0]);
            formData.append("content", data.content);
            formData.append("userId", userId)
            createNewPost(formData)
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
            return error
        }
    }

    // presentational component
    return isAuthed ? (
        <section>
            <form onSubmit={handleSubmit(createPost)} className='form-edit'>
                <h1>Créer votre publication </h1>
                <div className='input-container'>
                    <input
                        placeholder="Quoi de neuf ?"
                        type="text"
                        autoComplete="on"
                        {...register("content", { required: true })} />
                    {errors.content && <p className="alert-msg">Merci de mettre un message</p>}
                </div>
                <div>
                    <input
                        id='fileInput'
                        placeholder="Image"
                        type="file"
                        {...register("imageUrl", { required: true })} />
                    {errors.imageUrl && <p className='alert-msg'>Merci de mettre une image</p>}
                </div>
                <button className='button'>CRÉER</button>
            </form>
        </section>
    ) : (<Navigate replace to={"/login"} />)
};

export default CreateNewPost;