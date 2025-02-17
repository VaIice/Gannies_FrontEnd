import styled from 'styled-components';

import { postsHeaderStyle } from '@/styles/commonStyle/etc';
import { xsmall_500 } from '@/styles/commonStyle/localTextStyle';

const PostsWrapper = styled.div`
  margin-top: 10px;
`;

const PostsHeader = styled.div`
  ${postsHeaderStyle}
  display: flex;
  justify-content: space-between;
  padding: 12px 0;

  p {
    ${xsmall_500}
  }
`;

const PostsHeaderLeftBox = styled.div`
  display: flex;
  justify-content: space-between;
  > p {
    width: 70px;
    text-align: center;
  }
`;

const PostsHeaderRightBox = styled(PostsHeaderLeftBox)`
  > p {
    width: ${({ $pageName }) => {
      return $pageName === 'myComments' ? '109px' : '82px';
    }};
    text-align: left;

    &:first-of-type {
      width: ${({ $pageName }) => {
        return $pageName === 'myScraps' && '109px';
      }};
    }

    &:last-of-type {
      width: ${({ $pageName }) => {
        return $pageName === 'myPosts' && '109px';
      }};
    }
  }
`;

const PostListBox = styled.ul`
  li {
    border-bottom: 1px solid
      ${({ theme: { colors } }) => {
        return colors.gray['40'];
      }};
  }
`;

export {
  PostsWrapper,
  PostsHeader,
  PostsHeaderLeftBox,
  PostsHeaderRightBox,
  PostListBox,
};
