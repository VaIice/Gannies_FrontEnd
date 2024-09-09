import React from 'react';

import { Wrapper, Button } from '@/layouts/Navbar/style';

function Navbar() {
  return (
    <Wrapper>
      <Button to='/'>메인</Button>
      <Button>이론정보</Button>
      <Button>실습정보</Button>
      <Button>국가고시준비</Button>
      <Button>취업정보</Button>
      <Button>구인구직</Button>
      <Button>이벤트</Button>
      <Button>공지사항</Button>
    </Wrapper>
  );
}

export default Navbar;