import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ReactElement } from "react";

const Layout = (): ReactElement => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
