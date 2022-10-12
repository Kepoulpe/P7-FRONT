import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import '../styles/LoginForm.css';

function LoginForm(props) {

        const {isAuthed, login} = props;

        const { register, handleSubmit, formState: { errors } } = useForm();
        const navigate = useNavigate();

        const onSubmit = (data) => {
                try {
                        login(data.email, data.password);
                } catch (error) {
                        navigate("/login", { replace: true });
                        console.error("error from login form jsx");
                        return;
                }
        }

        return !isAuthed ? (
                <section id='login-form'>
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
                                        <p><Link to={"/signup"}> Pas encore de compte ?</Link></p>
                                </form>
                                
                </section>
        ): (<Navigate replace to={"/"}/>)

};

export default LoginForm;