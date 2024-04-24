import PropTypes from "prop-types";
import { GiShop } from "react-icons/gi";

function SecondCard({ parentDivClass }) {
  return (
    <div className={parentDivClass}>
      <GiShop className="text-4xl text-[#ff0000]" />
      <h3 className="text-xl font-[500]" data-test="card-heading-2">
        Save Time
      </h3>
      <p className="text-gray-600 text-sm" data-test="card-para-2">
        Make your production costs zero and get everything at one place that
        saves your time, money and energy. All in one place.
      </p>
    </div>
  );
}

SecondCard.propTypes = {
  parentDivClass: PropTypes.string,
};

export default SecondCard;
