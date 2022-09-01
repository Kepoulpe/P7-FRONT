import styles from '../styles/SwitchButtons.css'

function SwitchButtons (){
    return (
        <div className='gpm-switch'>
            <div className='gpm-switch-login' id='gpm-switch-login'><p>Se connecter</p></div>
            <div className='gpm-switch-signup'><p>Créer un compte</p></div>
        </div>
    )
}
export default SwitchButtons;