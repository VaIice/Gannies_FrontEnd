import { useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useEventHandler from '@/hooks/useEventHandler';
import { isOnlyWhiteSpaceCheck } from '@/utils/whiteSpaceCheck';

export default function usePostSearch() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const location = useLocation();
  const searchBarRef = useRef(null);

  const { changeValue: searchValue, handleChange: handleSearchValueChange } =
    useEventHandler({
      changeDefaultValue: '',
    });

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const condition =
        searchValue === '' ||
        searchValue === null ||
        searchValue === undefined ||
        isOnlyWhiteSpaceCheck(searchValue);

      condition
        ? alert('검색어를 한 글자 이상 입력해주세요.')
        : navigate(`/post/search/${searchValue}`);
      handleSearchValueChange('');
    }
    searchBarRef.current && searchBarRef.current.focus();
  };

  const handleSearchButtonClick = () => {
    const condition =
      searchValue === '' ||
      searchValue === null ||
      searchValue === undefined ||
      isOnlyWhiteSpaceCheck(searchValue);

    condition
      ? alert('검색어를 한 글자 이상 입력해주세요.')
      : navigate(`/post/search/${searchValue}`);

    handleSearchValueChange('');
  };

  useEffect(() => {
    searchBarRef.current && searchBarRef.current.focus();
  }, []);

  useEffect(() => {
    if (keyword) {
      handleSearchValueChange(keyword);
    } else {
      handleSearchValueChange('');
    }
  }, [location]);

  return {
    searchValue,
    searchBarRef,
    handleSearchValueChange,
    handleSearch,
    handleSearchButtonClick,
  };
}
