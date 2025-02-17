import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import uuid from 'react-uuid';

import { Wrapper, Button } from '@/layouts/Navbar/style';

import { setBoardType } from '@/store/navBarOptions';

import { navBarMenuData } from '@/layouts/Navbar/data';

import useSelectorList from '@/hooks/useSelectorList';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [navBarMenus] = useState(navBarMenuData);

  const { currentActiveMenuNumber } = useSelectorList();

  const handleNavBarMenuClick = (data) => {
    dispatch(setBoardType(data));
  };

  return (
    <Wrapper>
      {navBarMenus.map((navBarMenu) => {
        return (
          <Button
            key={uuid()}
            to={navBarMenu.path}
            $currentActiveMenuNumber={currentActiveMenuNumber}
            $myMenuNumber={navBarMenu.number}
            onClick={async () => {
              handleNavBarMenuClick({
                menuNumber: navBarMenu.number,
                boardType: navBarMenu.boardType,
                bannerTitle: navBarMenu.bannerTitle,
                bannerDesc: navBarMenu.bannerDesc,
              });
              navigate(navBarMenu.path);
            }}
          >
            {navBarMenu.label}
          </Button>
        );
      })}
    </Wrapper>
  );
}

export default Navbar;
