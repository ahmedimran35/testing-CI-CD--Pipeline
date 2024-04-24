/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Toast } from "./../../../../constants/toast.js";
import { signSn } from "./../../../../utils/signSn.js";

function InformationSection({ pages }) {
  const { googleSignIn, user } = useAuth();
  const axios = useAxiosSecure();

  const handleDonateLink = () => {
    if (user) return;

    signSn(googleSignIn, axios, Toast);
  };
  return (
    <div className="w-1/3 p-7 ">
      <h3 className="text-lg lg:text-xl uppercase">Information</h3>
      <div className="w-[300px] md:w-fit flex flex-row flex-wrap md:flex-col text-xs lg:text-sm gap-5 md:gap-1 items-start my-2 md:my-7 ">
        {/* <Link
          data-test="footer-donate"
          to="/donate"
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          <button type="button" onClick={handleDonateLink}>
            Donate
          </button>
        </Link>

        <Link
          to="/aboutus"
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          About Us
        </Link>

        <Link
          to="/blog"
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          Blog
        </Link>
        <Link
          to="/pressprogram"
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          Press Pass
        </Link>
        <Link
          to="/partnerprogram"
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          Partner Program
        </Link> */}
        <Link
          to="/donate"
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          Donate
        </Link>
        <Link
          to="/about-us"
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          About Us
        </Link>
        {pages?.map((page) => (
          <Link
            key={page?._id}
            to={`/${page?.pageName}`}
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            {page?.pageName}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InformationSection;
