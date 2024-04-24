/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function LegalSection({ pages }) {
  return (
    <div className="w-1/3 p-7 ">
      <h3 className="text-lg lg:text-xl uppercase">Legal</h3>
      <div className="w-[300px] md:w-fit flex flex-row flex-wrap md:flex-col text-xs lg:text-sm gap-5 md:gap-1 items-start my-2 md:my-7 ">
        {/* <Link
            to="/termstouse"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            Terms of Use
          </Link>
          <Link
            to="/license"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            License agreement
          </Link>
          <Link
            to="/copyright"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            Copyright information
          </Link>
          <Link
            to="/cookiepolicy"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            Cookies policy
          </Link>
          <Link
            to="/cookiesetting"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            Cookies Settings
          </Link>
  
          <Link
            to="/privacy"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            Privacy Policy
          </Link> */}
           {
          pages?.map((page) =>  <Link
          key={page?._id}
          to={`/${page?.pageName}`}
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
        >
          {page?.pageName}
        </Link>)}
        </div>
      </div>
    );
  }

  export default LegalSection;