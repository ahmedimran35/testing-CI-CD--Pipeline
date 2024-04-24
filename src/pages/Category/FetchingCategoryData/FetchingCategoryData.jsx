import { useNavigate } from "react-router-dom";
import useCategory from "../../../Hooks/useCategory";
import useResponsiveness from "../../../Hooks/useResponsiveness";
import CategoryLoading from "../../../components/isLoading/CategoryLoading";
import "./style.css";

const FetchingCategoryData = () => {

  const { isLaptopView, isDesktopView2 } = useResponsiveness();
  const navigate = useNavigate();

  const formatTextWithSpaces = (text) => {
    if (!text) return "";
    return text.replace(/\s/g, "-");
  };

  const AssetDetailArrow = (titleId) => {
    navigate(`/category-data/${titleId}`);
  };

  const {
    categoryBasedDatas,
    isCategoryLoading,
    isCategoryFetching,
    category,
  } = useCategory();

  if (isCategoryLoading || isCategoryFetching)
    return <CategoryLoading category={category} />;

  return (
    <>

      {categoryBasedDatas?.data?.map((asset, i) => {
        const titleSlug = formatTextWithSpaces(asset?.title);
        const titleId = `${titleSlug}-${asset?._id}`;
        return (
          <div
            onClick={() => AssetDetailArrow(titleId)}
            key={asset._id}
            data-test={`asset-${i}`}
            // className="rounded-md relative bg-white hover:shadow-lg w-full h-fit group mx-auto hover:cursor-pointer"
            className={`${category === 'icon' ? 'rounded w-fit' : 'rounded-md w-full'}  relative bg-white hover:shadow-lg h-fit group mx-auto hover:cursor-pointer`}
          >
            <img
              className={`${category === "icon"
                ? isDesktopView2 ? "w-20 h-20" : "w-30 h-20"
                : "object-center w-full h-[250px] md:h-28 lg:w-72  lg:h-40"
                } ${isLaptopView ? "h-28" : ""} rounded-md selector`}
              src={asset?.url}
              alt={asset?.alternativeText}
              loading="lazy"
            />
            {category === "icon" ? (
              " "
            ) : (
              <p className="absolute w-fit px-1 py-[2px] m-1 bottom-0 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 text-white font-medium rounded-md">
                {asset?.title}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default FetchingCategoryData;
