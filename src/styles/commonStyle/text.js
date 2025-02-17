import { css } from 'styled-components';

import {
  xsmall_500,
  xsmall_600,
  small_400,
  large_400,
  h4_600,
  h3_600,
} from '@/styles/commonStyle/localTextStyle';

const bannerTitleStyle = css`
  color: ${({ theme: { colors } }) => {
    return colors.black;
  }};
  ${h4_600}
`;

const bannerTextStyle = css`
  color: ${({ theme: { colors } }) => {
    return colors.gray['60'];
  }};
  ${large_400}
`;

const instructionTextStyle = css`
  color: ${({ theme: { colors } }) => {
    return colors.gray['60'];
  }};
  ${xsmall_500}
`;

const authTitleTextStyle = css`
  color: ${({ theme: { colors } }) => {
    return colors.gray.primary;
  }};
  ${h3_600}
`;

const placeholderTextStyle = css`
  color: ${(props) => props.theme.colors.gray[40]};
  ${small_400}
`;

const authDefaultTextStyle = css`
  color: ${(props) => props.theme.colors.gray[100]};
  ${small_400}
`;

const adminPageModalTitleStyle = css`
  ${h3_600}
  color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
`;

const adminPageModalInnerDataTitleStyle = css`
  ${xsmall_600}
  color: ${({ theme: { colors } }) => {
    return colors.gray['60'];
  }};
  margin-bottom: 10px;
`;

export {
  bannerTitleStyle,
  bannerTextStyle,
  instructionTextStyle,
  authTitleTextStyle,
  placeholderTextStyle,
  authDefaultTextStyle,
  adminPageModalTitleStyle,
  adminPageModalInnerDataTitleStyle,
};
