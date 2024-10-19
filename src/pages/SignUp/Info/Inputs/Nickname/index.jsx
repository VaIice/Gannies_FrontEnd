import Positive from '@/components/Instruction/Positive';
import Instruction from '@/components/Instruction';
import InputSection from '@/pages/SignUp/components/InputSection';
import DefaultInput from '@/pages/SignUp/components/DefaultInput';
import Negative from '@/components/Instruction/Negative';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useInputValid } from '@/hooks/useInputValid';
import { checkNicknameDuplicate } from '@/api/authApi';

function Nickname({ allow, handleAllow }) {
  const [nickname, setNickname] = useState('');
  const { handleDataToSend } = useOutletContext();
  const regex = /^[a-zA-Z가-힣]{2,8}$/;
  const validate = (nickname) => nickname.length >= 2 && regex.test(nickname);
  const instruction = [
    '사용 가능한 닉네임입니다',
    '필수 정보입니다',
    '유효하지 않은 닉네임 형식입니다',
    '중복된 닉네임입니다',
  ];
  const [instructionIndex, setInstructionIndex] = useState(undefined);
  const { isFocused, setIsFocused, checkIsValid } = useInputValid(
    undefined,
    validate
  );

  const handleNickname = async (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
    handleDataToSend('nickname', nickname);
    const allow = await checkIsValid(
      nickname,
      'nickname',
      checkNicknameDuplicate
    );
    setInstructionIndex(allow);
    if (allow === 0) {
      handleAllow(0, true);
    } else {
      handleAllow(0, false);
    }
  };

  useEffect(() => {
    console.log(allow);
  }, [allow]);
  return (
    <InputSection $margin='10px' title='닉네임*'>
      <DefaultInput
        placeholder='닉네임을 입력해주세요'
        onChange={handleNickname}
        value={nickname}
        $isFocused={isFocused}
        $isValid={allow[0]}
        onFocus={() => {
          setIsFocused(true);
          if (allow[0] === undefined) {
            handleAllow(0, false);
            setInstructionIndex(1);
          }
        }}
        onBlur={() => {
          setIsFocused(false);
          if (!allow[0] && !nickname) {
            handleAllow(0, undefined);
            setInstructionIndex(undefined);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      />
      {allow[0] ? (
        <Positive text={instruction[0]} />
      ) : (
        <>
          <Instruction text='*한글 또는 영문 2-8자' />
          <Instruction text='*숫자 및 특수문자 불가' />
          {<Negative text={instruction[instructionIndex]} />}
        </>
      )}
    </InputSection>
  );
}

export default Nickname;
