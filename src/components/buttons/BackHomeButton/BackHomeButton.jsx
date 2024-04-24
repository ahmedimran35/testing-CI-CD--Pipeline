
const BackHomeButton = () => {
    return (
        <button className={buttonClass}>
          <span>Back Home</span>
        </button>
    );
};

const buttonClass = "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-[#ff0000] px-6 text-sm font-medium tracking-wide text-white shadow-md transition duration-300 hover:bg-red-700 hover:shadow-md focus:bg-red-700 focus:shadow-md focus:shadow-red-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none";

export default BackHomeButton;