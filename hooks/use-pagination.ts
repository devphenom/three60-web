import { useMemo } from 'react';
interface IPaginationProps {
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
  Create an array of certain length and set the elements within it from
   start value to end value.
 */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

const usePagination = ({
  totalCount,
  siblingCount = 1,
  pageSize,
  currentPage,
}: IPaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = totalCount;
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
