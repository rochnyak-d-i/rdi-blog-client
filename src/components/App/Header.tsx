import React from 'react';
import { Link } from 'react-router-dom';
import { SearchFormContainer } from '@components/container/SearchForm/SearchForm';

export type HeaderProps = {};

export function Header(props: HeaderProps) {
  return (
    <header>
      <Link to="/">Logo</Link>

      <SearchFormContainer />
    </header>
  );
}
