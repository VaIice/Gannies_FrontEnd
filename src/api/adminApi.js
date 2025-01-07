import { api, cookieApi } from '@/api/axiosInstance';

//관리자 페이지 비밀번호 체크
export const adminPasswordCheck = async (password) => {
  const url = '/admin/check-password';
  const response = await cookieApi.post(url, password);
  return response;
};

//관리자 로그인
export const adminSignIn = async (signInData) => {
  const url = '/admin/sign-in';
  const response = await cookieApi.post(url, signInData);
  return response;
};

//회원 탈퇴(추방) 처리
export const deleteUser = async (userData) => {
  const url = '/admin/withdrawal';
  const response = await cookieApi.post(url, userData);
  return response;
};

//회원 탈퇴(추방) 처리 취소
export const cancelDeleteUser = async (userData) => {
  const url = '/admin/withdrawal/cancel';
  const response = await cookieApi.post(url, userData);
  return response;
};

//회원 정지 처리
export const blockUser = async (userBanData) => {
  const url = '/admin/suspension';
  const response = await cookieApi.post(url, userBanData);
  return response;
};

//회원 정지 취소
export const unblockUser = async (userIdData) => {
  const url = '/admin/suspension/cancel';
  const response = await cookieApi.post(url, userIdData);
  return response;
};

//회원 정지 취소 후 이메일 전송
export const sendUnblockNoticeEmail = async (userId) => {
  const url = 'admin/email?type=suspensionCancel';
  const response = await cookieApi.post(url, userId);
  return response;
};

//회원 페이지 단위로 조회
export const getUsers = async (params) => {
  const url = '/admin/users';
  const response = await cookieApi.get(url, { params });
  return response;
};

//특정 회원 조회(1명)
export const getUser = async (userId) => {
  const url = `/admin/users/${userId}`;
  const response = await cookieApi.get(url);
  return response;
};

//회원가입 대기자 목록 조회
export const getPendingUsers = async (params) => {
  const url = '/admin/approval';
  const response = await cookieApi.get(url, { params });
  return response;
};

//회원가입 최종 승인
export const signUpApprove = async (userIdData) => {
  const url = '/admin/user/approval';
  const response = await cookieApi.post(url, userIdData);
  return response;
};

//회원가입 최종 거절
export const signUpReject = async (rejectReasonData) => {
  const url = '/admin/user/rejection';
  const response = await cookieApi.post(url, rejectReasonData);
  return response;
};

//게시물 페이지 단위로 조회 밑 검색
export const getPostsOrSearchPosts = async (params) => {
  const url = '/admin/posts';
  const response = await cookieApi.get(url, { params });
  return response;
};

//게시물 삭제
export const deletePosts = async (postIdsData) => {
  const url = `/admin/posts`;
  const response = await cookieApi.delete(url, postIdsData);
  return response;
};

//댓글 밑 답글 페이지 단위로 조회
export const getCommentsOrReplyComments = async (params) => {
  const url = '/admin/comments';
  const response = await cookieApi.get(url, { params });
  return response;
};

//댓글 또는 답글 삭제
export const deleteCommentsOrReplyComments = async (commentIdsData) => {
  const url = `/admin/comments`;
  const response = await cookieApi.delete(url, commentIdsData);
  return response;
};

//이메일 전송
export const sendEmail = async (sendData, params) => {
  const url = `/admin/email`;
  const response = await cookieApi.post(url, sendData, { params });
  return response;
};
