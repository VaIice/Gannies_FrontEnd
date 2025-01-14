import styled from 'styled-components';

import { xsmall_500 } from '@/styles/commonStyle/localTextStyle';
import { ellipsisStyle } from '@/styles/commonStyle/etc';

export const IconBox = styled.div`
  display: flex;
  align-items: center;

  > p {
    margin-left: 8px;
    color: ${({ theme: { colors } }) => {
      return colors.gray['60'];
    }};
    ${xsmall_500}
    ${ellipsisStyle}
  }
`;
