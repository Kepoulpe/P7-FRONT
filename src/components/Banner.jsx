import '../styles/Banner.css'
import logo from '../assets/icon-left-font-monochrome-white.png'

function Banner() {
    return (
        <div className='gpm-banner'>
                <img src={logo} alt='Groupomania' className='gpm-logo'/>
        </div>
    )
};
export default Banner;