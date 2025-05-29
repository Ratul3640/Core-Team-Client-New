import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const MainLayout = () => {
    return (
        <div>
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <div className="min-h-[calc(100vh-200px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
