import React from "react";
import Header from "../dashboard/_components/Header";
import Footer from "../dashboard/_components/Footer";

// Public pages linked from the footer (no login needed)
export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full px-5 md:px-8 pb-16">{children}</main>
      <Footer />
    </div>
  );
}
