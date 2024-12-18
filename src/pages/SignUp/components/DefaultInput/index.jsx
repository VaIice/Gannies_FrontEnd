import {
  InputBox,
  InputWrapper,
} from '@/pages/SignUp/components/DefaultInput/style';

function DefaultInput({
  placeholder,
  $isFocused = undefined,
  $isValid = undefined,
  ...props
}) {
  return (
    <InputWrapper $isFocused={$isFocused} $isValid={$isValid}>
      <InputBox type='text' placeholder={placeholder} {...props} />
    </InputWrapper>
  );
}

export default DefaultInput;
