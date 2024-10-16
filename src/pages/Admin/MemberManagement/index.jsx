import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import TitleSection from '@/pages/Admin/TitleSection';
import Title from '@/pages/Admin/Title';
import ArrLengthSection from '@/pages/Admin/ArrLengthSection';
import ArrLengthView from '@/pages/Admin/ArrLengthView';
import SearchInput from '@/pages/Admin/SearchInput';
import TableWrapper from '@/pages/Admin/TableDesign/TableWrapper';
import TableHeaderRow from '@/pages/Admin/TableDesign/TableHeaderRow';
import TableBodyRow from '@/pages/Admin/TableDesign/TableBodyRow';
import PaginationWrapper from '@/pages/Admin/PaginationWrapper';
import Pagination from '@/components/Pagination';
import UserBanModal from '@/pages/Admin/Modals/UserBanModal';
import UserWithdrawModal from '@/pages/Admin/Modals/UserWithdrawModal';

import arrow from '@/assets/icons/arrows/chevron_down.svg';

import {
  OptionListBox,
  OptionList,
  OptionListOpenButton,
  SearchBox,
} from '@/pages/Admin/MemberManagement/style';

import useEventHandler from '@/hooks/useEventHandler';
import useFetchAndPaginate from '@/hooks/useFetchAndPaginate';
import useModalsControl from '@/hooks/useModalsControl';

import { setIsUserBanModal } from '@/store/modalsControl';
import { setIsUserWithdrawModal } from '@/store/modalsControl';

import { userBanWeeklyOptions } from '@/pages/Admin/Modals/UserBanModal/data';
import { memberManagementHeaderColumns } from '@/pages/Admin/data';

import { getUsers, blockUser, unblockUser, deleteUser } from '@/api/adminApi';

import { formatDateToPost } from '@/utils/dateFormatting';
import { communityPostMaxLimit, pageViewLimit } from '@/utils/itemLimit';
import { isOnlyWhiteSpaceCheck } from '@/utils/whiteSpaceCheck';
import { errorAlert, questionAlert } from '@/utils/sweetAlert';

export default function MemberManagement() {
  const {
    items: users,
    totalItems,
    currentPageNumber,
    groupedPageNumbers: pageNumbers,
    setItems: setUsers,
    getDataAndSetPageNumbers: getUsersAndSetPageNumbers,
    setCurrentPageNumber,
    handlePageNumberClick,
    handlePrevPageClick,
    handleNextPageClick,
  } = useFetchAndPaginate({
    defaultPageNumber: 1,
    itemMaxLimit: communityPostMaxLimit,
    pageViewLimit,
  });

  const {
    handleModalOpen,
    handleModalClose,
    isUserBanModal,
    isUserWithdrawModal,
  } = useModalsControl();

  const [headerColumns] = useState(memberManagementHeaderColumns);
  const [query, setQuery] = useState({
    page: currentPageNumber,
    limit: communityPostMaxLimit,
    //withReplies: true,
  });
  const [modalProps, setModalProps] = useState({});
  const [userBanOptions] = useState(userBanWeeklyOptions);
  const [isSubmit, setIsSubmit] = useState(false);
  const [actionType, setActionType] = useState('');

  const { changeValue: selectedUserBanWeek, handleChange: handleWeekSelect } =
    useEventHandler({
      changeDefaultValue: userBanWeeklyOptions[0].week,
    });
  const { changeValue: value, handleChange: handleValueChange } =
    useEventHandler({
      changeDefaultValue: '',
    });

  const handleOptionListToggle = (listNumber) => {
    const toggleFnc = (arr) => {
      return arr.map((list, idx) => {
        return {
          ...list,
          isOptionListOpen: idx === listNumber ? !list.isOptionListOpen : false,
        };
      });
    };
    setUsers((prev) => toggleFnc(prev));
  };

  const reset = () => {
    handleModalClose({ modalDispatch: setIsUserBanModal });
    handleModalClose({ modalDispatch: setIsUserWithdrawModal });
    handleValueChange('');
    handleWeekSelect(userBanWeeklyOptions[0].week);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (isSubmit) {
      return;
    }

    if (isOnlyWhiteSpaceCheck(value)) {
      errorAlert('사유를 입력 해주세요!');
      return;
    }

    setIsSubmit(true);

    try {
      type === 'userBan'
        ? await blockUser({
            userId: modalProps.userId,
            suspensionReason: value,
            suspensionDuration: selectedUserBanWeek,
          })
        : await deleteUser({
            userId: modalProps.userId,
            deletionReason: value,
          });

      reset();
      setQuery((prev) => {
        return {
          ...prev,
          page: currentPageNumber,
          limit: communityPostMaxLimit,
        };
      });
      setIsSubmit(false);
    } catch (error) {
      //200
      //400
      console.error(error);
    }
  };

  const handleUserBanCancel = async (userId) => {
    const isUserBanCancel = await questionAlert({
      title: '정지 해제',
      text: '해당 회원의 정지 상태를 해제 하시겠습니까?',
    });

    try {
      if (isUserBanCancel) {
        await unblockUser({ userId });
        setQuery((prev) => {
          return {
            ...prev,
            page: currentPageNumber,
            limit: communityPostMaxLimit,
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (actionType === 'pageMove') {
      window.scroll({ top: 0, left: 0 });
      setQuery((prev) => {
        return {
          ...prev,
          page: currentPageNumber,
          limit: communityPostMaxLimit,
        };
      });
    }
  }, [currentPageNumber]);

  useEffect(() => {
    (async () => {
      await getUsersAndSetPageNumbers(() => {
        return getUsers(query);
      });
    })();
  }, [query]);

  return (
    <>
      {isUserBanModal && (
        <UserBanModal
          userBanOptions={userBanOptions}
          userBanReason={value}
          userBanModalProps={modalProps}
          selectedUserBanWeek={selectedUserBanWeek}
          reset={reset}
          handleWeekSelect={handleWeekSelect}
          handleValueChange={handleValueChange}
          handleUserBanSubmit={handleSubmit}
        />
      )}
      {isUserWithdrawModal && (
        <UserWithdrawModal
          userWithdrawModalProps={modalProps}
          UserWithdrawReason={value}
          reset={reset}
          handleValueChange={handleValueChange}
          handleUserWithdrawSubmit={handleSubmit}
        />
      )}
      <TitleSection>
        <Title>회원관리</Title>
      </TitleSection>
      <ArrLengthSection>
        <ArrLengthView length={totalItems} />
        <SearchBox>
          <SearchInput
            currentPageNumber={currentPageNumber}
            setQuery={setQuery}
            setActionType={setActionType}
            setCurrentPageNumber={setCurrentPageNumber}
          />
        </SearchBox>
      </ArrLengthSection>
      <TableWrapper>
        <table>
          <thead>
            <TableHeaderRow currentActiveTab={'회원관리'}>
              {headerColumns?.map((data, idx) => {
                return (
                  <th key={uuid()}>
                    {data.header}
                    {idx === 6 && <img src={arrow} alt='bottom-arrow' />}
                  </th>
                );
              })}
            </TableHeaderRow>
          </thead>
          <tbody>
            {users?.map((user, idx) => {
              return (
                <TableBodyRow key={uuid()} currentActiveTab={'회원관리'}>
                  <td>{String(user.userId).padStart(2, '0')}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>{user.postCount}</td>
                  <td>{user.commentCount}</td>
                  <td>{formatDateToPost(user.createdAt)}</td>
                  <td>
                    {/* 1) 해당없음 -> 해당없음/정지/탈퇴
                    2) 탈퇴 -> X
                    3) 정지 -> 해당없음/탈퇴 */}
                    {user.isOptionListOpen && (
                      <OptionListBox>
                        {user.managementStatus !== '탈퇴' && (
                          <OptionList
                            $status={'해당없음'}
                            onClick={
                              user.managementStatus === '정지'
                                ? () => {
                                    handleUserBanCancel(user.userId);
                                    handleOptionListToggle(idx);
                                  }
                                : () => {
                                    handleOptionListToggle(idx);
                                  }
                            }
                          >
                            해당없음
                          </OptionList>
                        )}
                        {user.managementStatus !== '정지' &&
                          user.managementStatus !== '탈퇴' && (
                            <OptionList
                              $status={'정지'}
                              onClick={() => {
                                setModalProps({
                                  userNickname: user.nickname,
                                  userEmail: user.email,
                                  userId: user.userId,
                                });
                                handleModalOpen({
                                  modalDispatch: setIsUserBanModal,
                                });
                                handleOptionListToggle(idx);
                              }}
                            >
                              정지
                            </OptionList>
                          )}
                        <OptionList
                          $status={'탈퇴'}
                          onClick={() => {
                            setModalProps({
                              userNickname: user.nickname,
                              userEmail: user.email,
                              userId: user.userId,
                            });
                            handleModalOpen({
                              modalDispatch: setIsUserWithdrawModal,
                            });
                            handleOptionListToggle(idx);
                          }}
                        >
                          탈퇴
                        </OptionList>
                      </OptionListBox>
                    )}
                    <OptionListOpenButton
                      $status={user.managementStatus}
                      $modalState={user.isOptionListOpen}
                      onClick={
                        //현재 상태가 탈퇴일땐 event 없애기
                        user.managementStatus !== '탈퇴'
                          ? () => {
                              handleOptionListToggle(idx);
                            }
                          : undefined
                      }
                    >
                      <span>{user.managementStatus}</span>
                      {user.managementStatus !== '탈퇴' && (
                        <img src={arrow} alt='arrow' />
                      )}
                    </OptionListOpenButton>
                  </td>
                  <td>{user.managementReason}</td>
                </TableBodyRow>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
      {pageNumbers?.length > 0 && (
        <PaginationWrapper>
          <Pagination
            pageNumbers={pageNumbers}
            currentPageNumber={currentPageNumber}
            setActionType={setActionType}
            handlePageNumberClick={handlePageNumberClick}
            handlePrevPageClick={handlePrevPageClick}
            handleNextPageClick={handleNextPageClick}
          />
        </PaginationWrapper>
      )}
    </>
  );
}
