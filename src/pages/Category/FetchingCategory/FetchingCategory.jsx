import AccordianCategory from "../../../components/AccordianCategory/AccordianCategory";
import AccordianSubCategory from "../../../components/AccordianCategory/AccordianSubCategory";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import useCategory from "../../../Hooks/useCategory";
import FetchingCategoryData from "../FetchingCategoryData/FetchingCategoryData";
import AccordionCategoryFilter from "../../../components/AccordianCategory/AccordionCategoryFilter";


import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import useResponsiveness from "../../../Hooks/useResponsiveness";


import FetchingCategoryPagination from "./FetchingCategoryPagination";
import { Helmet } from "react-helmet-async";


const FetchingCategory = () => {
  const { isLaptopView, isDesktopView2, isDesktopView } = useResponsiveness();
  const { category, subCategory, setSearchTerm } = useCategory();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  // const { categoryBasedDatas, isCategoryLoading } = useCategory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchTerm = form.get("searchTerm");

    const pattern = /^[a-zA-Z\s]+$/gm;
    const result = pattern.test(searchTerm);

    if (result === false) return;

    setSearchTerm(searchTerm);
    setSearchValue(searchTerm);
    navigate(
      `/category-data?category=${category ? category : "All"}&subCategory=${subCategory ? subCategory : ""
      }&searchTerm=${searchTerm}`
    );
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchTerm("");
    const searchInput = document.querySelector('input[name="searchTerm"]');
    searchInput.value = "";
    navigate(
      `/category-data?category=${category ? category : "All"}&subCategory=${subCategory ? subCategory : ""
      }`
    );
  };
  const searchClassName =
    "border text-sm  focus:border-[#ff0000]  focus:outline-none  pl-2 h-10 w-full md:w-64 lg:w-72 rounded-md";

  return (
    <div className="max-w-7xl mx-auto pl-5 pr-2 mt-5 mb-10">
      <Helmet>
        <title>Free Assets at your fingertips </title>
        <meta name="description" content="All assets in one place" />
      </Helmet>
      <div
        className={`flex flex-col md:flex-row gap-5 md:gap-0 justify-between  ${isLaptopView ? "items-start" : ""
          } ${isDesktopView ? "items-center" : ""}`}
      >
        <BreadCrumb />
        <form onSubmit={handleSubmit} className="relative">
          <div>
            <input
              data-test="category-search"
              type="text"
              name="searchTerm"
              placeholder="Search here..."
              className={searchClassName}
            />
          </div>
          {searchValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-10 top-[11px]  text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <RxCross2 className="text-[#ff0000] text-xl " />
            </button>
          )}
          <button
            onChange={(e) => setSearchTerm(e.target.value)}
            type="submit"
            className="absolute top-[5px] right-1"
          >
            <IoIosSearch className="text-[#ff0000] text-3xl " />
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-2 my-10 ">
        <div className="w-full md:w-1/4 md:min-h-screen border rounded-md p-[3px] md:p-[7px] lg:p-3 md:sticky md:top-2 ">
          <AccordionCategoryFilter />
          <AccordianCategory />
          <AccordianSubCategory />
        </div>
        <div
          // className={`w-full md:w-3/4  grid ${category === "icon"
          //     ? "grid-cols-4 md:grid-cols-5 gap-2 lg:grid-cols-8"
          //     : " gap-3"
          //   } grid-cols-1 md:grid-cols-3 md:px-2 rounded-md`}

          className={`w-full md:w-3/4 grid 
  ${category === "icon"
              ? isDesktopView2
                ? "grid-cols-8 gap-0 w-fit"
                : isLaptopView
                  ? "grid-cols-6 gap-1"
                  : "grid-cols-4 md:grid-cols-5 gap-1 md:gap-0"
              : "grid-cols-1 md:grid-cols-3 gap-2"
            }  rounded-md`}


        >
          <FetchingCategoryData />
        </div>
      </div>
      <div>
        <FetchingCategoryPagination />
      </div>
    </div>
  );
};

export default FetchingCategory;
