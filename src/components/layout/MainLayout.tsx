import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen" data-id="7eobv90j2" data-path="src/components/layout/MainLayout.tsx">
      <Navbar />
      <main className="flex-grow" data-id="49j3gcgle" data-path="src/components/layout/MainLayout.tsx">{children}</main>
      <Footer />
    </div>);

};

export default MainLayout;