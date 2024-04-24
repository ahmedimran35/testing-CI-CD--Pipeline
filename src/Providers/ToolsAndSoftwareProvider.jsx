import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export const CategoryToolsAndSoftwareContext = createContext();
const ToolsAndSoftwareCategoryProvider = ({ children }) => {
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategoryLink, setSelectedCategoryLink] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const subCategory = queryParams.get("subCategory");
  const urlSearchTerm = queryParams.get("searchValue");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(30);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetch("/softwareAndtoolsCategory.json").then((res) =>
      res.json().then((data) => setAllCategory(data))
    );
  }, []);

  const {
    data: categoryBasedDatas = [],
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
  } = useQuery({
    queryKey: [
      "tools-and-software",
      subCategory,
      urlSearchTerm,
      pageLimit,
      currentPage,
    ],
    queryFn: async () => {
      let url = "";
      if (urlSearchTerm || subCategory) {
        url = `/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee?subCategories=${subCategory}&searchTerm=${searchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        url = `/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee?page=${currentPage}&limit=${pageLimit}`;
      }
      const res = await axiosPublic.get(url);
      return res?.data?.data;
    },
    // Configure caching behavior
    staleTime: 100000, // Refetch data after 10 minute of inactivity
  });

  const categoryInfo = {
    allCategory,
    selectedCategoryLink,
    setSearchTerm,
    setSelectedCategoryLink,
    setSelectedSubCategory,
    categoryBasedDatas,
    isCategoryLoading,
    isCategoryFetching,
    setSubCategories,
    category,
    subCategory,
    subCategories,
    urlSearchTerm,
    setCurrentPage,
    setLimit,
    pageLimit,
    currentPage,
  };
  return (
    <CategoryToolsAndSoftwareContext.Provider value={categoryInfo}>
      {children}
    </CategoryToolsAndSoftwareContext.Provider>
  );
};

ToolsAndSoftwareCategoryProvider.propTypes = {
  children: PropTypes.any,
};

export default ToolsAndSoftwareCategoryProvider;
