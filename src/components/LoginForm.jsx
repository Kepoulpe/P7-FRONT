import loginUser from '../API/loginUser';

import { useState } from 'react';
import { useForm } from 'react-hook-form'
import '../styles/LoginForm.css';

function LoginForm() {
        const { register, handleSubmit, watch, formState: { errors } } = useForm();
        async function onSubmit(data) {
                try {
                        const user = await loginUser(data.userName, data.email, data.password)
                } catch (error) {
                        console.error(error);
                        return error
                }
        }
        return (
                <section>
                                <form onSubmit={handleSubmit(onSubmit)} className='form'>
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
                                        <button>Connexion</button>
                                </form>
                </section>
        )

}

export default LoginForm;