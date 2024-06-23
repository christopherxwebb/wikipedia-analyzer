import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <main>{children}</main>
      <footer>© 2024 Wikipedia Page Analyzer</footer>
    </div>
  );
};

export default Layout;