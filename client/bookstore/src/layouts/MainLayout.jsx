import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {

  const location = useLocation();
  const shouldShowHeader = !["/login", "/register"].includes(location.pathname);
  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
