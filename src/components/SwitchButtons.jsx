import styles from '../styles/SwitchButtons.css';


function loginClick() {
    const btnLogin = document.getElementById('gpm-switch-login');
    const btnSignup = document.getElementById('gpm-switch-signup');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    btnSignup.style.backgroundColor = "transparent";
    btnLogin.style.backgroundColor = "white";
    signupForm.style.visibility="hidden";
    loginForm.style.visibility="visible";

}
function signupClick() {
    const btnLogin = document.getElementById('gpm-switch-login');
    const btnSignup = document.getElementById('gpm-switch-signup');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    btnLogin.style.backgroundColor = "transparent";
    btnSignup.style.backgroundColor= "white";
    signupForm.style.visibility="visible";
    loginForm.style.visibility="hidden";

}


function SwitchButtons() {
    return (
        <div className='gpm-switch'>
            <div className='gpm-switch-login' id='gpm-switch-login' onClick={() => loginClick()}><p>Se connecter</p></div>
            <div className='gpm-switch-signup' id='gpm-switch-signup' onClick={() => signupClick()} ><p>Créer un compte</p></div>
        </div>
    )
}
export default SwitchButtons;