import uuid from 'react-uuid';
import arrow from '@/assets/icons/arrows/chevron_right.svg';

import {
  Arrow,
  FontWrapper,
  Icon,
  Wrapper,
  IconsWrapper,
  FontActive,
  FontInactive,
  Instruction,
  FontFinished,
} from '@/pages/SignUp/components/Icons/style';

function Icons({ identity, info, department, sequence }) {
  const fonts = ['본인인증', '정보입력', '학과인증'];

  return (
    <Wrapper>
      <IconsWrapper>
        <Icon src={identity} alt='verify' />
        <Arrow src={arrow} alt='arrow' />
        <Icon src={info} alt='info' />
        <Arrow src={arrow} alt='arrow' />
        <Icon src={department} alt='department' />
      </IconsWrapper>
      <FontWrapper>
        {sequence.map((s, e) => {
          let Font;

          switch (s) {
            case 'active':
              Font = FontActive;
              break;
            case 'finished':
              Font = FontFinished;
              break;
            default:
              Font = FontInactive;
          }

          return <Font key={uuid()}>{fonts[e]}</Font>;
        })}
      </FontWrapper>
      <Instruction>*필수항목</Instruction>
    </Wrapper>
  );
}

export default Icons;
