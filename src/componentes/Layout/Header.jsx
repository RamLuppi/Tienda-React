import React from 'react';
import { NavBar } from './NavBar';

export function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'between',
      alignItems: 'center',
      padding: '1rem 2rem',
      color: 'white'
    }}>
      <NavBar />
    </header>
  );
}