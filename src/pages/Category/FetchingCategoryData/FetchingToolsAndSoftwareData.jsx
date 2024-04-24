import { useNavigate } from "react-router-dom";
import useToolsAndSoftwareCategory from "../../../Hooks/useToolsAndSoftware";
import useResponsiveness from "../../../Hooks/useResponsiveness";
import CategoryLoading from "../../../components/isLoading/CategoryLoading";
import "./style.css";
const FetchingToolsAndSoftwareData = () => {
  const navigate = useNavigate();
  const { isDesktopView2, isLaptopView } = useResponsiveness();
  const formatTextWithSpaces = (text) => {
    if (!text) return "";
    return text.replace(/\s/g, "-");
  };

  const AssetDetailArrow = (titleId) => {
    navigate(`/software-and-tools-data/${titleId}`);
  };

  const { categoryBasedDatas, isCategoryLoading, isCategoryFetching } =
    useToolsAndSoftwareCategory();

  if (isCategoryLoading || isCategoryFetching)
    return <CategoryLoading category={"s"} />;

  return (
    <>
      {categoryBasedDatas?.data?.map((asset) => {
        const titleSlug = formatTextWithSpaces(asset?.title);
        const titleId = `${titleSlug}-${asset?._id}`;

        return (
          // tools and software portion
          <div
            onClick={() => AssetDetailArrow(titleId)}
            key={asset._id}
            className={`rounded-md border flex flex-col bg-white shadow-md  lg:h-96 w-full group mx-auto hover:cursor-pointer`}
          >
            <div className="relative">
              <img
                className={`w-full h-[250px] lg:w-full object-cover md:h-28 h-${
                  isDesktopView2 ? "[200px]" : ""
                } lg:h-48
               h-${
                 isLaptopView ? "28" : ""
               } h-48 rounded-t-md group-hover:scale-[.98] transition-all duration-300 selector`}
                src={asset?.url}
                alt={asset?.alternativeText}
                // loading="lazy"
              />
              {asset?.discountPercentage > 0 ? (
                <p className="absolute px-[6px] py-[1px] top-2 right-2 text-center font-[600] w-fit text-[12px] bg-red-200 rounded mt-[2px]">
                  {" "}
                  {parseInt(asset?.discountPercentage)}% off
                </p>
              ) : (
                ""
              )}
            </div>
            <h4 className=" px-[6px] py-[2px] mx-1 mt-2 bottom-0 text-lg text-black font-medium  rounded-md text-left">
              {asset?.title}
            </h4>
            <p className="text-xs px-[10px] flex-grow mt-2">
              {asset?.description?.slice(0, 120)}...
            </p>
            {asset?.pricing === "Freemium" || asset?.pricing === "Paid" ? (
              <div className="flex flex-row justify-center items-center gap-2 my-3">
                <p className="text-lg font-semibold">
                  {" "}
                  ${asset?.discountPrice}
                </p>{" "}
                <p className="text-sm">
                  <s> ${asset?.regularPrice}</s>
                </p>
              </div>
            ) : (
              <p className="flex flex-row justify-center items-center text-lg font-semibold my-3">
                Free
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default FetchingToolsAndSoftwareData;
