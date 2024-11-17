import React from 'react';
import Header from './_components/Header';

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="mx-5 md:mx-20 flex-grow pb-10 ">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;


