import React from 'react';
import '@testing-library/jest-dom';
import MainNavBar from './MainNavBar';
import { render, screen } from '@testing-library/react';


describe('MainNavBar', () => {
  it('renders all navigation links', () => {
    render(<MainNavBar />);

    expect(screen.getByText('messages')).toBeInTheDocument();
    expect(screen.getByText('profile')).toBeInTheDocument();
    expect(screen.getByText('posts')).toBeInTheDocument();
  });

  it('navigates to the corrects routes', () => {
    render(<MainNavBar />);

    expect(screen.getByText('messages').closest('a')).toHaveAttribute('href', '/messages');
    expect(screen.getByText('profile').closest('a')).toHaveAttribute('href', '/profile');
    expect(screen.getByText('posts').closest('a')).toHaveAttribute('href', '/posts');
  })
});