import createUser from '../API/createUser';

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import '../styles/SignupForm.css';



function SignupForm(props) {
        const { register, handleSubmit, formState: { errors } } = useForm();
        const [errorMessage, setErrorMessage] = useState(null);
        const {isAuthed} = props;
        const navigate = useNavigate();


        async function onSubmit(data) {
                try {
                        setErrorMessage(null)
                        await createUser(data.userName, data.email, data.password)
                        navigate("/login", { replace: true });
                } catch (error) {
                        setErrorMessage(error.msg)
                        console.error(error);
                }
        }
        return !isAuthed ? (
                <section id='signup-form'>
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
                                <p><Link to={"/login"}> Déja un compte ?</Link></p>
                        </form>
                        {(errorMessage) && <div><p>{errorMessage}</p></div>}

                </section>
        ): (<Navigate replace to={"/"} />)
}


export default SignupForm;