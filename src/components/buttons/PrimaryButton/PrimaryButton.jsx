import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PrimaryButton = ({ text }) => {
  return (
    <Link to={`/category-data?category=All`}>
      <button
        className={`inline-flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-[13px] text-xs md:text-[12px] lg:text-base font-normal tracking-wide text-white transition duration-300 rounded-lg whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl`}
      >
        <span>{text}</span>
      </button>
    </Link>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
};

export default PrimaryButton;
