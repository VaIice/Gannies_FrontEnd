import uuid from 'react-uuid';

import PageNumber from '@/components/PageNumber';

import prevArrow from '@/assets/icons/arrows/chevron_left.svg';
import nextArrow from '@/assets/icons/arrows/chevron_right.svg';
import prev10PagesArrow from '@/assets/icons/arrows/double_chevron_lef.svg';
import next10PagesArrow from '@/assets/icons/arrows/double_chevron_right.svg';

import {
  ArrowBox,
  ArrowButton,
  PageNumberBox,
} from '@/components/Pagination/style';

export default function Pagination({
  pageNumbers,
  currentPageNumber = 1,
  setActionType,
  handlePageNumberClick,
  handlePrevPageClick,
  handleNextPageClick,
}) {
  return (
    <>
      <ArrowBox>
        <ArrowButton
          onClick={() => {
            if (setActionType) {
              setActionType('pageMove');
            }
            handlePrevPageClick({ stepSize: 10 });
          }}
        >
          <img src={prev10PagesArrow} alt={'prev-page-button'} />
        </ArrowButton>
        <ArrowButton
          onClick={() => {
            if (setActionType) {
              setActionType('pageMove');
            }
            handlePrevPageClick({ stepSize: 1 });
          }}
        >
          <img src={prevArrow} alt={'prev-10pages-button'} />
        </ArrowButton>
      </ArrowBox>
      <PageNumberBox>
        {pageNumbers?.map((myNumber) => {
          return (
            <PageNumber
              key={uuid()}
              myPageNumber={myNumber}
              currentPageNumber={currentPageNumber}
              handlePageNumberClick={() => {
                if (setActionType) {
                  setActionType('pageMove');
                }
                handlePageNumberClick(myNumber);
              }}
            />
          );
        })}
      </PageNumberBox>
      <ArrowBox>
        <ArrowButton
          onClick={() => {
            if (setActionType) {
              setActionType('pageMove');
            }
            handleNextPageClick({ stepSize: 1 });
          }}
        >
          <img src={nextArrow} alt={'next-page-button'} />
        </ArrowButton>
        <ArrowButton
          onClick={() => {
            if (setActionType) {
              setActionType('pageMove');
            }
            handleNextPageClick({ stepSize: 10 });
          }}
        >
          <img src={next10PagesArrow} alt={'next-10pages-button'} />
        </ArrowButton>
      </ArrowBox>
    </>
  );
}
