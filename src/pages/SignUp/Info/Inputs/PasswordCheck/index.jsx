import { useState } from 'react';

import InputSection from '@/pages/SignUp/components/InputSection';
import Positive from '@/components/Instruction/Positive';

import {
  InputBox,
  InputWrapper,
  EyeIcon,
  EyeSlashIcon,
} from '@/pages/SignUp/Info/Inputs/Password/style';
import Negative from '@/components/Instruction/Negative';

function PasswordCheck({ allow, passwordCheck, setPasswordCheck }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    const passwordCheck = e.target.value.slice(0, 16);
    setPasswordCheck(passwordCheck);
  };

  return (
    <InputSection $margin='37px' title='비밀번호 확인*'>
      <InputWrapper>
        <InputBox
          type={showPassword ? 'text' : 'password'}
          placeholder='확인을 위해 비밀번호를 입력해주세요'
          value={passwordCheck}
          onChange={handlePassword}
        />
        {showPassword ? (
          <EyeIcon onClick={handleShowPassword} />
        ) : (
          <EyeSlashIcon onClick={handleShowPassword} />
        )}
      </InputWrapper>
      {passwordCheck.length > 0 &&
        (allow[3] ? (
          <Positive text='비밀번호가 일치합니다' />
        ) : (
          <Negative text='비밀번호가 일치하지 않습니다' />
        ))}
    </InputSection>
  );
}

export default PasswordCheck;