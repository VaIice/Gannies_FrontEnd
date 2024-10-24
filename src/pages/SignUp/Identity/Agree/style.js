import styled from 'styled-components';

import { instructionTextStyle } from '@/styles/commonStyle/text';
import { small_400, small_600 } from '@/styles/commonStyle/localTextStyle';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;
`;

export const SectionWrapper = styled.div`
  width: 456px;
  margin: auto;
`;
export const AgreeWrapper = styled.div`
  display: flex;
  margin-top: 23px;
  align-items: center;

  &:first-of-type {
    margin-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray[40]};
  }

  span {
    color: ${(props) => props.theme.colors.gray[100]};
    ${small_400}
    margin-right: 10px;
  }

  p {
    color: ${(props) => props.theme.colors.gray[100]};
    ${small_600}
  }
`;
export const Info = styled.span`
  ${instructionTextStyle};
`;

export const ShowButton = styled.button`
  ${instructionTextStyle};
  margin-left: auto;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  cursor: pointer;
`;
