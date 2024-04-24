import { useNavigate } from "react-router-dom";
import MainTitle from "./bannerComponents/MainTitle";
import SubText from "./bannerComponents/SubText";
import MainSearch from "./bannerComponents/MainSearch";
import DonateText from "./bannerComponents/DonateText";
import useCategory from "../../../Hooks/useCategory";
import DonateButton from "../../../components/buttons/DonateButton/DonateButton";

const BannerSection = () => {
  const navigate = useNavigate();
  const { setSearchTerm } = useCategory();

  const handleSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchTerm = form.get("searchTerm");

    const pattern = /^[a-zA-Z\s]+$/gm;
    const result = pattern.test(searchTerm)
    
    if (result === false)
      return;
    
    setSearchTerm(searchTerm);
    navigate(`/category-data?category=All&searchTerm=${searchTerm}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col justify-center items-center text-center gap-8 my-20 md:my-32 lg:my-40">
        <SubText />
        <MainTitle />
        <MainSearch handleSearch={handleSearch}></MainSearch>
        <DonateButton />
        <DonateText />
      </div>
    </div>
  );
};

export default BannerSection;
