import { useState, useEffect, useRef } from 'react';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
import MemberManagementModal from '@/pages/Admin/Modals/MemberManagementModal';
import AlignSelectMenu from '@/components/AlignSelectMenu';

import arrow from '@/assets/icons/arrows/chevron_down.svg';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import {
  OptionListBox,
  OptionList,
  OptionListOpenButton,
  SearchBox,
  ResetButton,
  DummyClickBox,
} from '@/pages/Admin/MemberManagement/style';

import useEventHandler from '@/hooks/useEventHandler';
import useFetchAndPaginate from '@/hooks/useFetchAndPaginate';
import useModalsControl from '@/hooks/useModalsControl';

import { userBanWeeklyOptions } from '@/pages/Admin/Modals/UserBanModal/data';
import { memberManagementHeaderColumns } from '@/pages/Admin/data';
import { adminPageUserSearchTypes } from '@/components/AlignSelectMenu/data';

import {
  getUsers,
  blockUser,
  unblockUser,
  sendUnblockNoticeEmail,
  deleteUser,
  sendEmail,
} from '@/api/adminApi';

import { formatDateToPost } from '@/utils/dateFormatting';
import { communityPostMaxLimit, pageViewLimit } from '@/utils/itemLimit';
import { isOnlyWhiteSpaceCheck } from '@/utils/whiteSpaceCheck';
import { errorAlert, questionAlert, confirmAlert } from '@/utils/sweetAlert';
import { isIncludesWhiteSpaceCheck } from '@/utils/whiteSpaceCheck';

export default function MemberManagement() {
  const debounceRef = useRef(null);

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
    isMemberManagementDetailModal,
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
  const [serachTypes] = useState(adminPageUserSearchTypes);
  const [selectedSearchType, setSelectedSearchType] = useState(
    adminPageUserSearchTypes[0].label
  );
  const [selectedSearchTypeQuery, setSelectedSearchTypeQuery] = useState(
    adminPageUserSearchTypes[0].query
  );
  const [
    memberManagementDetailModalProps,
    setMemberManagementDetailModalProps,
  ] = useState({});

  const { changeValue: selectedUserBanWeek, handleChange: handleWeekSelect } =
    useEventHandler({
      changeDefaultValue: userBanWeeklyOptions[0].week,
    });
  const { changeValue: value, handleChange: handleValueChange } =
    useEventHandler({
      changeDefaultValue: '',
    });

  const { changeValue: searchValue, handleChange: handleSearchValueChange } =
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

  const modalStateReset = () => {
    handleModalClose({ modalName: 'isUserBanModal' });
    handleModalClose({ modalName: 'isUserWithdrawModal' });
    handleValueChange('');
    handleWeekSelect(userBanWeeklyOptions[0].week);
  };

  const handleAllStateReset = () => {
    setActionType('');
    setSelectedSearchType(adminPageUserSearchTypes[0].label);
    setSelectedSearchTypeQuery(adminPageUserSearchTypes[0].query);
    setCurrentPageNumber(1);
    setQuery({
      page: 1,
      limit: communityPostMaxLimit,
      withReplies: true,
    });
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
      modalStateReset();
      setQuery((prev) => {
        return {
          ...prev,
          page: currentPageNumber,
          limit: communityPostMaxLimit,
        };
      });

      confirmAlert(
        type === 'userBan'
          ? '해당 회원을 정지 시켰습니다.'
          : '해당 회원을 탈퇴 시켰습니다.'
      );

      try {
        await sendEmail(
          {
            userId: modalProps.userId,
          },
          { type: type === 'userBan' ? 'suspension' : 'withdrawal' }
        );
      } catch (error) {
        errorAlert(error.message);
      }
    } catch (error) {
      //200
      //400
      console.error(error);
    } finally {
      setIsSubmit(false);
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
        await sendUnblockNoticeEmail({ userId });
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

  const handleSearch = () => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setActionType('');
      setCurrentPageNumber(1);
      setQuery({
        page: 1,
        limit: communityPostMaxLimit,
        type: selectedSearchTypeQuery,
        search: searchValue,
      });
    }, 100);
  };

  useEffect(() => {
    return () => {
      debounceRef.current = null;
    };
  }, []);

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
      {isMemberManagementDetailModal && (
        <MemberManagementModal
          memberManagementDetailModalProps={memberManagementDetailModalProps}
          handleModalClose={() => {
            handleModalClose({
              modalName: 'isMemberManagementDetailModal',
            });
          }}
        />
      )}
      {isUserBanModal && (
        <UserBanModal
          userBanOptions={userBanOptions}
          userBanReason={value}
          userBanModalProps={modalProps}
          selectedUserBanWeek={selectedUserBanWeek}
          modalStateReset={modalStateReset}
          handleWeekSelect={handleWeekSelect}
          handleValueChange={handleValueChange}
          handleUserBanSubmit={handleSubmit}
        />
      )}
      {isUserWithdrawModal && (
        <UserWithdrawModal
          userWithdrawModalProps={modalProps}
          UserWithdrawReason={value}
          modalStateReset={modalStateReset}
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
          <AlignSelectMenu
            optionList={serachTypes}
            pageType={'admin'}
            selectedOption={selectedSearchType}
            setSelectedOption={setSelectedSearchType}
            handleSelectedOption={setSelectedSearchTypeQuery}
          />
          <SearchInput
            searchValue={searchValue}
            handleSearchValueChange={handleSearchValueChange}
            handleSearch={handleSearch}
          />
          <ResetButton onClick={handleAllStateReset}>
            <FontAwesomeIcon icon={faUndoAlt} />
          </ResetButton>
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
                  <td>{formatDateToPost({ date: user.createdAt })}</td>
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
                                  modalName: 'isUserBanModal',
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
                              modalName: 'isUserWithdrawModal',
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
                  <DummyClickBox
                    onClick={() => {
                      setMemberManagementDetailModalProps({
                        userId: String(user.userId).padStart(2, '0'),
                        nickname: user.nickname,
                        postCount: user.postCount,
                        commentCount: user.commentCount,
                        createDate: formatDateToPost({
                          date: user.createdAt,
                          type: 'edit',
                        }),
                        managementStatus: user.managementStatus,
                        managementReason: user.managementReason,
                      });
                      handleModalOpen({
                        modalName: 'isMemberManagementDetailModal',
                      });
                    }}
                  />
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
