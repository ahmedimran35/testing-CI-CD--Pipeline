/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../../Hooks/useCategory";

const AccordianSubCategory = () => {
  const {
    category: selectCategory,
    subCategory: selectedSubCategory,
    urlSearchTerm,
    selectedCategoryLink,
    setSelectedSubCategory,
    subCategories,
    setSubCategories,
  } = useCategory();

  useEffect(() => {
    fetch("/categoryList.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredSubCategories = data?.find(
          (category) =>{
         return   category?.categoryLink === selectedCategoryLink?.categoryLink
          })?.subCategories;
        setSubCategories(filteredSubCategories || []);
      });
  }, [selectedCategoryLink?.categoryLink, setSubCategories, selectCategory, selectedCategoryLink]);

  return (
    <div>
      <Accordion elevation={0} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="text-sm lg:text-base"
        >
          Sub Category
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          {subCategories?.map((subCategory, i) => (
            <NavLink
              to={`/category-data?category=${selectCategory}&subCategory=${
                subCategory?.subCategoryLink
              }&searchTerm=${urlSearchTerm ? urlSearchTerm : ""}`}
              data-test={`${subCategory?.subCategoryName}`}
              key={i}
              className={`${
                subCategory?.subCategoryLink === selectedSubCategory
                  ? "bg-[#ff0000] text-white "
                  : ""
              }  border p-1 rounded-md text-xs px-2 py-1 `}
              onClick={() =>
                setSelectedSubCategory(subCategory?.subCategoryLink)
             
              }
            >
              {subCategory?.subCategoryName}
            </NavLink>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordianSubCategory;
