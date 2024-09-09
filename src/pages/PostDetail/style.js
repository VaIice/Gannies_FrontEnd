import styled from 'styled-components';

import {
  small_600,
  medium_400,
  medium_600,
  body,
} from '@/styles/commonStyle/localTextStyle';

const PageCategorySection = styled.section`
  margin: 65px 0px 15px 65px;
`;

const ContentsWrapper = styled.div`
  width: 1043px;
  margin: 0 auto;
  border-top: 2px solid
    ${({ theme: { colors } }) => {
      return colors.gray['60'];
    }};
`;

const PostHeaderBox = styled.div`
  padding: 0 42px;
  border-bottom: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray['50'];
    }};
`;

const Nickname = styled.p`
  ${medium_400}
  color: ${({ theme: { colors } }) => {
    return colors.gray['100'];
  }};
  margin-bottom: 32px;
`;

const PostContentBox = styled.div`
  padding: 35px 43px 0;
  margin-bottom: 100px;
  > p {
    ${body}
    color: ${({ theme: { colors } }) => {
      return colors.gray['100'];
    }};
    line-height: 35px;
    margin-bottom: 100px;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 20px 15px;
  border-bottom: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray['30'];
    }};

  > p {
    ${small_600}
    color: ${({ theme: { colors } }) => {
      return colors.highlight;
    }};
    margin-left: 10px;
  }
  > img {
    cursor: pointer;
  }
`;

const CommentArea = styled.div`
  padding: 25px 20px 60px;
`;

const CommentLengthView = styled.p`
  ${medium_600}
  color: ${({ theme: { colors } }) => {
    return colors.gray['100'];
  }};
  margin-bottom: 25px;
`;

const CommentCreateBox = styled.div`
  padding: 30px 25px;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray['20'];
    }};
  border-radius: 8px;
`;

export {
  PageCategorySection,
  ContentsWrapper,
  PostHeaderBox,
  Nickname,
  PostContentBox,
  IconBox,
  CommentArea,
  CommentLengthView,
  CommentCreateBox,
};