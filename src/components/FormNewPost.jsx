import React from 'react';

import createUser from '../API/createUser';
import { useForm } from 'react-hook-form'
import createNewPost from '../API/createNewPost';

function FormNewPost() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    async function createPost(data) {
        try {
            const user = await createNewPost(data.content, data.image);
        } catch (error) {
            console.error(error);
            return error
        }
    }

    return (
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
    )
}
export default FormNewPost;