import createUser from '../API/createUser';

import { useState } from 'react';
import { useForm } from 'react-hook-form'
import styles from '../styles/SignupForm.css';



function SignupForm() {
        const { register, handleSubmit, watch, formState: { errors } } = useForm();
        const [errorMessage, setErrorMessage] = useState(null)
        const [requestSending, setrequestSending] = useState(false)
        

        async function onSubmit(data) {
                try {
                        setrequestSending(true)
                        setErrorMessage(null)
                        const user = await createUser(data.userName, data.email, data.password)
                } catch (error) {
                        setErrorMessage(error.msg)
                        console.error(error);
                }
        }
        return (
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
                                </form>
                                {(errorMessage) && <div><p>{errorMessage}</p></div>}

                </section>
        )
}


export default SignupForm;