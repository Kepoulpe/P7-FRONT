import createUser from '../API/createUser';

import { useState } from 'react';
import { useForm } from 'react-hook-form'
import styles from '../styles/SignupForm.css';



function SignupForm() {
        const { register, handleSubmit, watch, formState: { errors } } = useForm();
        async function onSubmit(data) {
                try {
                        const user = await createUser(data.userName, data.email, data.password)
                } catch (error) {
                        console.error(error);
                        return error
                }
        }
        return (
                <section>
                                <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
                                        <div className="flex flex-col">
                                                <input
                                                        placeholder="Nom d'utilisateur"
                                                        type="text"
                                                        autoComplete="on"
                                                        {...register("userName", { required: true })} />
                                                {errors.userName && <p className="alert-msg">Le nom d'utilisateur doit être renseigné !</p>}
                                        </div>
                                        <div>
                                                <input
                                                        placeholder="Email"
                                                        type="email"
                                                        autoComplete="on"
                                                        {...register("email", { required: true })} />
                                                {errors.email && <p className="alert-msg">Une adresse email doit être renseigné !</p>}
                                        </div>
                                        <div>
                                                <input
                                                        placeholder="Mot de passe"
                                                        type="password"
                                                        autoComplete="on"
                                                        {...register("password", { required: true })} />
                                                {errors.password && <p className="alert-msg">Un mot de passe doit être renseigné !</p>}
                                        </div>
                                        <button>Créer mon compte</button>
                                </form>
                </section>
        )
}


export default SignupForm;