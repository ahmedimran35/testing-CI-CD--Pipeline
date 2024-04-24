import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import useCategory from "../../Hooks/useCategory";
import ScrollToTop from "../ScrollToTheTop/ScrollToTheTop";

const AccordianCategory = () => {
  const {
    category: selectedCategory,
    urlSearchTerm,
    allCategory,
    setSelectedCategoryLink,
    setCurrentPage,
  } = useCategory();

  const changeCategoryOrPageLimitHandler = () => {
    setCurrentPage(1);
    setSelectedCategoryLink("All");
  };

  return (
    <div>
      <Accordion elevation={0} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="text-sm lg:text-base"
        >
          Category
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          <NavLink
            to={`/category-data?category=All&searchTerm=${
              urlSearchTerm ? urlSearchTerm : ""
            }`}
            onClick={() => {
              changeCategoryOrPageLimitHandler();
            }}
            className={`${
              "All" === selectedCategory
                ? "bg-[#ff0000] text-white border-none"
                : ""
            }  border px-2 py-1 rounded-md text-xs`}
            data-test={`all-category`}
          >
            All
          </NavLink>
          {allCategory?.map((category, i) => (
            <NavLink
              data-test={`category-${i}`}
              to={`/category-data?category=${
                category?.categoryLink
              }&searchTerm=${urlSearchTerm ? urlSearchTerm : ""}`}
              key={i}
              className={`${
                category?.categoryLink === selectedCategory
                  ? "bg-[#ff0000] text-white"
                  : ""
              }  border rounded-md px-2 py-1 text-xs flex items-center justify-center`}
              onClick={() => {
                setSelectedCategoryLink(category);
                return <ScrollToTop />;
              }}
            >
              {category?.CategoryName}
            </NavLink>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordianCategory;
