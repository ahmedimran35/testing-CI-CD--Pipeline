import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import BASMainText from "./BASComponents/BASMainText";
import BASPhoto from "./BASComponents/BASPhoto";

const BrowseAllSection = () => {
  return (
    <div className="bg-black my-20">
      <div className="md:max-w-4xl lg:max-w-7xl mx-auto h-[500px] md:h-[400px] lg:h-[550px] flex flex-col md:flex-row justify-between items-center p-10">
        <div className="text-white max-w-xl flex flex-col justify-between items-start gap-5 lg:gap-10">
          <h3 className="lg:text-md text-[#ABABAB]">
            Welcome to the new YT SHOPS
          </h3>
          <BASMainText />
          <PrimaryButton text="Browse All Categories" />
        </div>

        <BASPhoto />
      </div>
    </div>
  );
};

export default BrowseAllSection;
