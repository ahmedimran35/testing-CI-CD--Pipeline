import PropTypes from "prop-types"
import { Link } from "react-router-dom";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import useAuth from "../../../../Hooks/useAuth";
// import { signSn } from "../../../../utils/signSn";
// import { Toast } from "../../../../constants/toast";

const ResInformation = ({ informationPages }) => {
  // const { googleSignIn, user } = useAuth();
  // const axios = useAxiosSecure();

  // const handleDonateLink = () => {
  //   if (user) return;
  //   signSn(googleSignIn, axios, Toast);
  // };

  return (
    <details className="group p-4">
      <summary className="relative cursor-pointer list-none pr-8 font-medium text-[#d4d3d3] transition-colors duration-300 focus-visible:outline-none group-hover:text-[#fff] hover:font-semibold [&::-webkit-details-marker]:hidden mb-3">
        Information
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0 top-1 h-4 w-4 shrink-0 text-white transition duration-300 group-open:rotate-45"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-labelledby="title-ac14 desc-ac14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </summary>
      {/* <ul className="mt-4 space-y-4 ml-5">
        <li>
          <Link
            to="/donate"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
          >
            <button type="button" onClick={handleDonateLink}>
              Donate
            </button>
          </Link>
        </li>
        <li>
          <Link
            to="/aboutus"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/blog"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/pressprogram"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
          >
            Press Pass
          </Link>
        </li>
        <li>
          <Link
            to="/partnerprogram"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
          >
            Partner Program
          </Link>
        </li>
        <li>
          <Link
            to="/ytshopsbrandguideline"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
          >
            YTShops Brand Guideline
          </Link>
        </li>
      </ul> */}

      <Link
        to="/about-us"
        className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300 mr-5 mb-3"
      >
        About Us
      </Link>
      {
        // eslint-disable-next-line react/prop-types
        informationPages?.map((page) => (
          <Link
            key={page?._id}
            to={`/${page?.pageName}`}
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300 flex gap-5 mb-3 mt-3"
          >
            {page?.pageName}
          </Link>
        ))
      }
    </details>
  );
};

ResInformation.propTypes = {
  informationPages: PropTypes.any
}

export default ResInformation;
