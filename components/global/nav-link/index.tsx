import styled from '@emotion/styled';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  href: string;
  exact?: boolean;
  className?: any;
  children: any;
};

const StyledAnchorTag = styled.a`
  display: inline-block;
  cursor: pointer;
  color: brand.100;
  padding: 20px;
  width: 100%;
  &.active {
    background-color: rgba(70, 115, 228, 0.08);
    color: var(--brand-500);
  }
`;

export const NavLink = ({
  href,
  exact,
  children,
  className,
  ...rest
}: Props) => {
  const { pathname } = useRouter();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    console.log(isActive);
    className += ' active';
  }

  return (
    <NextLink href={href}>
      <StyledAnchorTag className={className} {...rest}>
        {children}
      </StyledAnchorTag>
    </NextLink>
  );
};
