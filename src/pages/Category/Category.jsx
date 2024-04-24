import { Outlet } from "react-router-dom";
import CategoryNavbar from "../../components/category-navbar/CategoryNavbar";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTheTop/ScrollToTheTop";
import MainNavbar from "../../components/Navbar/MainNavbar";

const Category = () => {
    
    return (
        <div>
            <ScrollToTop />
            <MainNavbar/>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Category;