import { useState } from 'react';

import CommonLoadingCircle from '@/components/Loading/CommonLoadingCircle';
import Buttons from '@/pages/SignIn/Buttons';
import Inputs from '@/pages/SignIn/Inputs';
import Title from '@/pages/SignIn/Title';

function Login() {
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');

  return (
    <>
      {isLoading && <CommonLoadingCircle />}
      <Title />
      <Inputs
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        setLoginError={setLoginError}
        setIsLoading={setIsLoading}
        text={text}
        setText={setText}
      />
      <Buttons
        email={email}
        password={password}
        setLoginError={setLoginError}
        setIsLoading={setIsLoading}
        setText={setText}
      />
    </>
  );
}

export default Login;
