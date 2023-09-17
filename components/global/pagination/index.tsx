import React from 'react';
import { usePagination } from '@hooks';
import styled from '@emotion/styled';
import { DOTS } from '@hooks/use-pagination';
import { Button } from '../button';
import { IconButton } from '@chakra-ui/react';
import { ArrowRight, CaretLeft, CaretRight } from '@phosphor-icons/react';

type Props = {};

const Container = styled.ul`
  display: flex;
  list-style-type: none;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .pagination-item {
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;

    &.dots:hover {
      background-color: transparent;
      cursor: default;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }

    &.selected {
      background-color: rgba(0, 0, 0, 0.08);
    }

    .arrow {
      &::before {
        position: relative;
        /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
        content: '';
        /* By using an em scale, the arrows will size with the font */
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: 0.12em solid rgba(0, 0, 0, 0.87);
        border-top: 0.12em solid rgba(0, 0, 0, 0.87);
      }

      &.left {
        transform: rotate(-135deg) translate(-50%);
      }

      &.right {
        transform: rotate(45deg);
      }
    }

    &.disabled {
      pointer-events: none;

      .arrow::before {
        border-right: 0.12em solid rgba(0, 0, 0, 0.43);
        border-top: 0.12em solid rgba(0, 0, 0, 0.43);
      }

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }
`;

interface IPaginationProps {
  onPageChange: (val: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

export const Pagination = (props: IPaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange?.length as number) < 2) {
    return null;
  }

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  let lastPage = paginationRange?.[paginationRange.length - 1];

  return (
    <Container className={className}>
      <Button
        p={3}
        mr={1}
        onClick={onPrevious}
        aria-label="prev"
        leftIcon={<CaretLeft weight="thin" />}
        isDisabled={currentPage === 1}
        colorScheme="blue"
        fontSize="sm"
        boxShadow="md"
      >
        Previous
      </Button>
      {paginationRange?.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <Button
            colorScheme={pageNumber === currentPage ? 'blue' : undefined}
            mx={1}
            rounded={'3xl'}
            boxShadow={'md'}
            onClick={() => onPageChange(pageNumber as number)}
            key={pageNumber}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        p={3}
        ml={1}
        onClick={onNext}
        aria-label="next"
        rightIcon={<CaretRight weight="thin" />}
        isDisabled={currentPage === lastPage}
        colorScheme="blue"
        boxShadow="md"
        fontSize="sm"
      >
        Next
      </Button>
    </Container>
  );
};
