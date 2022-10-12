import createUser from '../API/createUser';

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import '../styles/SignupForm.css';



function SignupForm(props) {
        const { register, handleSubmit, formState: { errors } } = useForm();
        const { isAuthed } = props;
        const [responseMessage, setResponseMessage] = useState([]);
        const navigate = useNavigate();


        async function onSubmit(data) {
                let response;
                try {
                        response = await createUser(data.userName, data.email, data.password)
                        if (response.success === true) {
                                navigate("/login", { replace: true });
                        } else {
                                setResponseMessage(response.errors[0].msg)
                        }
                } catch (error) {
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
                                {(responseMessage) && <div><p>{responseMessage}</p></div>}
                        </form>
                </section>
        ) : (<Navigate replace to={"/"} />)
}


export default SignupForm;