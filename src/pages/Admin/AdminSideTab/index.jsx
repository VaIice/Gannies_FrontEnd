import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import {
  TabContainer,
  ProfileBox,
  TabMenuList,
} from '@/pages/Admin/AdminSideTab/style';

import { adminTabMenuData } from '@/pages/Admin/data';

import { useEventHandler } from '@/hooks/useEventHandler';

export default function AdminSideTab() {
  const navigate = useNavigate();
  const location = useLocation();

  const { clickChangeState: currentActiveTabMenu, handleClickChange } =
    useEventHandler({
      clickChangeDefaultValue: null,
    });

  const [tabData] = useState(adminTabMenuData);

  useEffect(() => {
    const path = location.pathname.split('/admin')[1];
    console.log(path);

    if (path === '/report-history') {
      handleClickChange('신고내역');
    } else if (path === '/member-management') {
      handleClickChange('회원관리');
    } else if (path === '/user-approval') {
      handleClickChange('회원 가입승인');
    } else if (path === '/post-management') {
      handleClickChange('게시물 관리');
    }
  }, []);

  return (
    <TabContainer>
      <ProfileBox>
        <div></div>
        <p>관리자 입니다</p>
      </ProfileBox>
      <ul>
        {tabData?.map((tab) => {
          return (
            <TabMenuList
              key={uuid()}
              $currentActiveTabMenu={currentActiveTabMenu}
              $ownMenu={tab.label}
              onClick={() => {
                handleClickChange(tab.label);
                navigate(tab.path);
              }}
            >
              <img
                src={
                  currentActiveTabMenu === tab.label
                    ? tab.activeIcon
                    : tab.defaultIcon
                }
                alt={
                  currentActiveTabMenu === tab.label
                    ? tab.activeAlt
                    : tab.default
                }
              />
              <p>{tab.label}</p>
            </TabMenuList>
          );
        })}
      </ul>
    </TabContainer>
  );
}