// eslint-disable-next-line react/prop-types
const PrimaryButtonSmaill = ({ text }) => {
  return (
    <button className="inline-flex items-center justify-center px-3 py-2 md:px-4 md:py-[10px] text-xs md:text-[12px] lg:text-[15px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl uppercase hover:cursor-pointer">
      {text}
    </button>
  );
};

export default PrimaryButtonSmaill;
