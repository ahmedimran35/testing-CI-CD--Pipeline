import H2Title from "../../../components/Titles/H2Title";
import Athelet from "./PRComponents/Athelet";
import Coding from "./PRComponents/Coding";
import DailyLife from "./PRComponents/DailyLife";
import Flower from "./PRComponents/Flower";
import Garden from "./PRComponents/Garden";
import Science from "./PRComponents/Science";
import Space from "./PRComponents/Space";
import Study from "./PRComponents/Study";
import Working from "./PRComponents/Working";

const PopularResources = () => {
  return (
    <div className=" max-w-7xl mx-auto space-y-10">
      <H2Title baseText={"Popular"} coloredText={"Resources"} />

      <div 
        className="grid gap-3 grid-cols-4 md:grid-cols-9 lg:grid-cols-12 grid-rows-3  mx-3"
      >
        <Flower></Flower>
        <DailyLife></DailyLife>
        <Working></Working>
        <Space></Space>
        <Science></Science>
        <Garden></Garden>
        <Athelet></Athelet>
        <Study></Study>
        <Coding></Coding>
      </div>
    </div>
  );
};

export default PopularResources;
