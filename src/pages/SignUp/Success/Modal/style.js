import { modalBoxStyle } from "@/styles/commonStyle";

import Close from "@/components/Icons/Close";
import styled from "styled-components";


export const ModalBox = styled.div`
  ${modalBoxStyle};
  width: 524px;
  height: 406px;
  padding: 26px 36px;

  > h4 {
    margin-top: 23px;
    font-size: ${props => props.theme.typo.size.h4};
    font-weight: ${props => props.theme.typo.weight.semiBold};
    color: ${props => props.theme.colors.primary};
    margin-bottom: 16px;
  }

  > h6 {
    margin-top: 12px;
    font-size: ${props => props.theme.typo.size.sm};
    font-weight: ${props => props.theme.typo.weight.regular};
    color: ${props => props.theme.colors.gray[100]};
  }

  > p {
    margin-top: 41px;
    font-size: ${props => props.theme.typo.size.xs};
    font-weight: ${props => props.theme.typo.weight.medium};
    color: ${props => props.theme.colors.gray[70]};
  }

  > span {
    margin-top: 21px;
    font-size: ${props => props.theme.typo.size.xs};
    font-weight: ${props => props.theme.typo.weight.semiBold};
    color: ${props => props.theme.colors.highlight};
  }  
`;

export const CloseIcon = styled(Close)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto;
`

export const Image = styled.img`
  width: 80px;
  height: 80px;
`