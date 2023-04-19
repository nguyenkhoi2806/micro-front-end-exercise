import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Hamburger from "../Hamburger";
import Header from "../Header";
import TopSection from "../TopSection";
import Footer from "../Footer";

const fallbackComponent = () => {
  return (
    <div style={{ width: '100px', height: '100px', backgroundColor: '#cccccc' }}></div>
  )
}


function Layout({eventBus}: any) {

  const location = useLocation();

  useEffect(() => {
    ($("select") as any).niceSelect();
  }, []);

  useEffect(() => {
    document.getElementsByTagName("BODY")[0].scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div> 
      <Hamburger />
      <Header eventBus={eventBus}/>
      <div className="container">
        <TopSection />
        <Suspense fallback={fallbackComponent()}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
