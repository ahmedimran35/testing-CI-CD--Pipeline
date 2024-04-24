import PropTypes from "prop-types";
import { BsFillBoxSeamFill } from "react-icons/bs";

function FirstCard({ parentDivClass }) {
  return (
    <div className={parentDivClass}>
      <BsFillBoxSeamFill className="text-4xl text-[#ff0000]" />
      <h3 className="text-xl font-[500]" data-test="card-heading-1">
        Extensive Library
      </h3>
      <p className="text-gray-600 text-sm" data-test="card-para-1">
        Explore a vast library of diverse digital assets for all creative needs.
      </p>
    </div>
  );
}

FirstCard.propTypes = {
  parentDivClass: PropTypes.string,
};

export default FirstCard;
