import styled from 'styled-components';
import { instructionTextStyle } from '@/styles/commonStyle/text';

export const Font = styled.span`
  ${instructionTextStyle};
  display: block;
  margin-top: 10px;
`;

function Instruction({ text }) {
  return <Font>{text}</Font>;
}

export default Instruction;
