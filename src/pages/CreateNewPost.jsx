import React from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


function CreateNewPost(props) {

    const { isAuthed, createNewPost } = props;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const createPost = (data) => {
        try {
            createNewPost(data.content, data.image);
        } catch (error) {
            console.error(error);
            return error
        }
    }

    // presentational composent
    return isAuthed ? (
        <section id='login-form'>
            <form onSubmit={handleSubmit(createPost)} className='form'>
                <h1>Créer votre publication </h1>
                <div>
                    <input
                        placeholder="Quoi de neuf ?"
                        type="text"
                        autoComplete="on"
                        {...register("content", { required: true })} />
                    {errors.content && <p className="alert-msg">Merci de mettre un message</p>}
                </div>
                <div>
                    <input
                        placeholder="Image"
                        type="file"
                        accept='image/*'
                        autoComplete="on"
                        {...register("image", { required: false })} />
                </div>
                <button>CRÉER</button>
            </form>
        </section>
    ) : (<Navigate replace to={"/login"} />)
};

export default CreateNewPost;