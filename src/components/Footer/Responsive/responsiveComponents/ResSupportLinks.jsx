import PropTypes from "prop-types"
import { Link } from "react-router-dom";

const ResSupportLinks = ({ supportPages }) => {
  return (
    <details className="group p-4">
      <summary className="relative cursor-pointer list-none pr-8 font-medium text-[#d4d3d3] transition-colors duration-300 focus-visible:outline-none group-hover:text-[#fff] hover:font-semibold [&::-webkit-details-marker]:hidden  mb-3">
        Support
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
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
            to="/faq"
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
            to="/support"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
            to="/59bda3f8ee98128d543572e0d29f27ad5343f0c88c36e7bf4672c4c3ab6245b4"
          >
            Feedback
          </Link>
        </li>
      </ul> */}
      <Link
        to="/feedback"
        className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
      >
        Feedback
      </Link>
      {supportPages?.map((page) => (
        <Link
          key={page?._id}
          to={`/${page?.pageName}`}
          className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300 flex gap-5 mb-3 mt-3"
        >
          {page?.pageName}
        </Link>
      ))}
    </details>
  );
};

ResSupportLinks.propTypes = {
  supportPages: PropTypes.any
}

export default ResSupportLinks;
