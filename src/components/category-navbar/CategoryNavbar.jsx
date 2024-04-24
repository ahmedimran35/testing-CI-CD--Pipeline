import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import SignInButton from "../buttons/SignInButton/SignInButton";
import brandLogoalpha from "/BrandLogoalpha.svg";
import { AiOutlineUser } from "react-icons/ai";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useResponsiveness from "../../Hooks/useResponsiveness";
import { Toast } from "../../constants/toast";
import { signSn } from "../../utils/signSn";
const CategoryNavbar = () => {
  const { isLaptopView, isDesktopView } = useResponsiveness();
  const { user, logOut, googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userInfo = {} } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email, "userInfo"],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(`/04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb/${user?.email}`);
        return res?.data;
      }
    },
    staleTime: 100000, // Refetch data after 10 minute of inactivity
  });

  const handleLogout = () => {
    logOut();
  };

  const handleDonateLink = () => {
    if (user) return;
    signSn(googleSignIn, axiosSecure, Toast);
  }

  return (
    <header className="max-w-7xl mx-auto flex flex-row items-center justify-between mt-4 text-black font-medium px-2">
      {/* brand logo */}
      <Link
        to="/"
        className={`flex-grow ${isLaptopView ? "flex-grow-1" : ""} ${
          isDesktopView ? "flex-grow-0" : ""
        } hover:cursor-pointer`}
      >
        <img
          src={brandLogoalpha}
          className={`w-64 ${isLaptopView ? "w-[210px]" : ""} ${
            isDesktopView ? "w-[260px]" : ""
          }`}
          alt=""
        />
      </Link>

      <nav className="flex gap-3 items-center text-sm">
        <NavLink
          to="/donate"
          className="hover:text-[#ff0000] text-base text-[8px] lg:text-sm transition-colors duration-300 hidden lg:contents"
        >
          <button type="button" onClick={handleDonateLink}>

          Donate
          </button>
        </NavLink>

        <div className="">
          {user && user ? (
            <div className="flex gap-1">
              {user && userInfo?.data?.role === "864910b487ac2b8247e708b993c929c8dc248f78c18afbcf89efab2f2ec99f47" && (
                <Link
                  to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/35ea33bcec36ccce8bdb472f803c4fc0d0eaae9d4c51181e5000a9eff322179b"
                  className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                >
                  <AiOutlineUser className="text-xl lg:text-3xl" />
                </Link>
              )}
              {user && userInfo?.data?.role === "71e3fbabd25ad65e984a05f178e7e02564fae80001bf6acd89b1e4c96ad3c467" && (
                <Link
                  to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/46bade64727b5046da39635eea8448e552d31d9009829b919ffc96e65847fc88"
                  className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                >
                  <AiOutlineUser className="text-xl lg:text-3xl" />
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`inline-flex items-center justify-center gap-2 text-sm tracking-wide text-white transition-colors duration-300 px-4 py-[6px] lg:px-6 lg:py-2 hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl rounded-md font-medium`}
              >
                Logout
              </button>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
    </header>
  );
};

export default CategoryNavbar;
