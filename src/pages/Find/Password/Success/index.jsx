import Active from '@/pages/Find/components/Active';
import EmailBox from '@/pages/Find/components/EmailBox';
import FindBox from '@/pages/Find/components/FindBox';
import Inactive from '@/pages/Find/components/Inactive';
import Wrapper from '@/pages/Find/components/Wrapper';

import { ButtonWrapper, MiddleButton } from '@/pages/Find/ID/Success/style';
import { useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <Wrapper>
      <FindBox $margin='80px'>
        <Inactive type='id' text={'이메일 찾기'} />
        <Active type='password' text={'비밀번호 찾기'} />
      </FindBox>
      <p>가입하신 이메일주소로 임시 비밀번호가 전송되었습니다</p>
      <span>임시비밀번호로 로그인 후 반드시 비밀번호 변경을 해주세요</span>
      <EmailBox text={email} />
      <ButtonWrapper>
        <MiddleButton to='/sign-in'>로그인 하기</MiddleButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Success;
