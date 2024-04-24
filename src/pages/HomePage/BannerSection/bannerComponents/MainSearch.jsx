import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
function MainSearch({ handleSearch }) {
  return (
    <div className="relative">
      <form onSubmit={handleSearch} data-test="search">
        <input
          
          name="searchTerm"
          type="text"
          placeholder="Search Here..."
          className="w-[320px] md:w-[430px] lg:w-[630px] h-[60px] border-[#ff0000] rounded-full border-[3px] px-5 outline-none text-xl"
        />
        <button type="submit" data-test="enter">
          <CiSearch className="absolute text-[40px] text-white bg-[#ff0000] rounded-full p-1 transition duration-300 hover:bg-[#C21807] right-3 top-[10px] hover:cursor-pointer" />
        </button>
      </form>
    </div>
  );
}

MainSearch.propTypes = {
  handleSearch: PropTypes.func,
};

export default MainSearch;
