import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import search from '@/assets/icons/search/search_default.svg';
import logo from '@/assets/images/logo.png';

import {
  Wrapper,
  Logo,
  LoginButton,
  SignUpButton,
  Input,
  LogoutButton,
  MypageButton,
} from '@/layouts/Header/style';

import useSelectorList from '@/hooks/useSelectorList';

import { setBoardType } from '@/store/navBarOptions';
import { handleModal } from '@/store/modalState';
import { setLogout } from '@/store/auth';

import { userSignOut } from '@/api/authApi';
import useUserState from '@/hooks/useUserState';

function Header() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { isLogin } = useSelectorList();

  useEffect(() => {
    if (location.startsWith('/community') || location.startsWith('/mypage')) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  }, [location]);

  const handleSearchBar = (e) => {
    setText(e.target.value);
  };

  const handleLogout = async () => {
    try {
      const response = await userSignOut();
      if (response.status === 200) {
        dispatch(handleModal({ field: 'isApproval', value: false }));
        dispatch(setLogout());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { navigateBasedOnState } = useUserState();

  const handleMyPage = () => {
    navigateBasedOnState('/mypage/profile/edit', 'email_verified');
  };

  return (
    <Wrapper>
      <Logo
        onClick={() => {
          navigate('/');
          dispatch(
            setBoardType({
              menuNumber: 0,
              boardType: 'all',
              bannerTitle: '',
              bannerText: '',
            })
          );
        }}
      >
        <img src={logo} alt='logo' />
      </Logo>
      {showSearchBar && (
        <form>
          <img src={search} alt='searchIcon' />
          <Input
            placeholder='관심있는 이야기를 검색해보세요'
            value={text}
            onChange={handleSearchBar}
          />
        </form>
      )}
      {isLogin ? (
        <>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          <span>|</span>
          <MypageButton onClick={handleMyPage}>마이페이지</MypageButton>
        </>
      ) : (
        <>
          <LoginButton to='/sign-in'>로그인</LoginButton>
          <SignUpButton to='/sign-up/identity'>회원가입</SignUpButton>
        </>
      )}
    </Wrapper>
  );
}

export default Header;