import { useEffect, useState } from "react";

//header
import Header from "../components/partials/dashboard/HeaderStyle/header";

//sidebar
import RightSidebar from "../components/partials/dashboard/SidebarStyle/rightsidebar";

//sidebar
import Sidebar from "../components/partials/dashboard/SidebarStyle/sidebar";

//footer
import Footer from "../components/partials/dashboard/FooterStyle/footer";

//default

// share-offcanvas
// import ShareOffcanvas from "../components/share-offcanvas";

//settingoffCanvas
import SettingOffCanvas from "../components/setting/SettingOffCanvas";

//session and router
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getUserDetails } from "../store/profile";
import { useDispatch } from "react-redux";
import axios from "axios";

const Default = ({ children, tokenExpired }) => {
  const [ShowPage, setShowPage] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  //check valid user
  const GetSession = async () => {
    const session = await getSession();
    if (!session) {
      router.push("/auth/login");
    } else {
      if (tokenExpired != null) {
        router.push("/auth/login");
      }
      setShowPage(true);
    }
  };

  useEffect(() => {
    GetSession();
    dispatch(getUserDetails());
  }, [dispatch]);
  return (
    <>
      {ShowPage && ShowPage ? (
        <>
          <Sidebar />
          <Header />
          <div className="main-content">
            <div id="content-page" className="content-page">
              {children}
            </div>
          </div>
          {/* <RightSidebar /> */}
          <Footer />
          {/* <SettingOffCanvas /> */}
        </>
      ) : null}
    </>
  );
};

export default Default;

export const getServerSideProps = async () => {
  const res = await axios.get("/api/handler");
  const tokenExpired = res.data.accessTokenExpires;

  return {
    props: {
      tokenExpired,
    },
  };
};
