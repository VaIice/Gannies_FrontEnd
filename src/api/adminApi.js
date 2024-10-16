import { cookieApi } from '@/api/axiosInstance';

//관리자 로그인
export const adminSignUp = async (signInData) => {
  const url = '/admin/sign-in';
  const response = await cookieApi.post(url, signInData);
  return response;
};

//회원 탈퇴(추방) 처리
export const deleteUser = async (userData) => {
  const url = '/admin/withdrawal';
  const response = await cookieApi.delete(url, userData);
  return response;
};

//회원 탈퇴(추방) 처리 취소
export const cancelDeleteUser = async (userData) => {
  const url = '/admin/withdrawal/cancel';
  const response = await cookieApi.post(url, userData);
  return response;
};

//회원 정지 처리
export const blockUser = async (userData) => {
  const url = '/admin/suspension';
  const response = await cookieApi.post(url, userData);
  return response;
};

//회원 정지 취소
export const unblockUser = async (userData) => {
  const url = '/admin/suspension/cancel';
  const response = await cookieApi.post(url, userData);
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

//회원가입 승인 밑 거절
export const approveOrRejectRegistration = async (isApprovalData) => {
  const url = '/admin/approval';
  const response = await cookieApi.post(url, isApprovalData);
  return response;
};

//게시물 페이지 단위로 조회 밑 검색
export const getPostsOrSearchPost = async (params) => {
  const url = '/admin/posts';
  const response = await cookieApi.get(url, { params });
  return response;
};

//특정 게시물 삭제(1개)
export const deletePost = async (postId) => {
  const url = `/admin/posts/${postId}`;
  const response = await cookieApi.delete(url);
  return response;
};

//댓글 밑 답글 페이지 단위로 조회(10개)
export const getCommentsOrReplyComments = async (params) => {
  const url = '/admin/comments';
  const response = await cookieApi.get(url, { params });
  return response;
};

//특정 댓글 밑 답글 삭제(1개)
export const deleteCommentOrReplyComment = async (commentId) => {
  const url = `/admin/comments/${commentId}`;
  const response = await cookieApi.delete(url);
  return response;
};
