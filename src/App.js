
import './styles/App.css';

import Banner from './components/Banner';
import LoginForm from './components/LoginForm';
import SwitchButtons from './components/SwitchButtons';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div>
      <Banner />
      <div className='gpm-form'>
        <SwitchButtons />
        <LoginForm />
        <SignupForm />
      </div>
    </div>
  )
}

export default App;
