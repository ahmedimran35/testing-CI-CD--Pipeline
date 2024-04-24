import PropTypes from "prop-types";
import { FaHandsClapping } from "react-icons/fa6";

function FourthCard({ parentDivClass }) {
  return (
    <div className={`${parentDivClass} pt-10`}>
      <FaHandsClapping className="text-4xl text-[#ff0000]" />
      <h3 className="text-xl font-[500]" data-test="card-heading-4 ">
        Comprehensive Assets
      </h3>
      <p className="text-gray-600 text-sm" data-test="card-para-4">
        Dive into millions of high-quality, creative assets—all meticulously
        curated to fuel your projects and streamline your workflow. Make your
        lifespan longer and sustainable.
      </p>
    </div>
  );
}

FourthCard.propTypes = {
  parentDivClass: PropTypes.string,
};

export default FourthCard;
