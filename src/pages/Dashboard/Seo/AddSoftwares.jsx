import { Helmet } from "react-helmet-async";
import H2Title from "../../../components/Titles/H2Title";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import "./border.css";
import Swal from "sweetalert2";
import PrimaryButtonSmaill from "../../../components/buttons/PrimaryButtonSmall/PrimaryButtonSmaill";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import InputAssetTitle from "../../../components/InputFields/InputAssetTitle/InputAssetTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, subCategory, theme) {
  return {
    fontWeight:
      subCategory.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddSoftwares = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchCategory, setFetchedCategory] = useState([]);
  const [category, setCategory] = useState("");

  // react quill
  const [briefDescription, setBriefDescription] = useState("");
  // const axios = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const theme = useTheme();
  const [subCategory, setSubCategory] = useState([]);
  const [pricing, setPricing] = useState("");
  const pricingArray = ["Free", "Freemium", "Paid"];

  const formControlInput = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "red" },
      "&.Mui-focused fieldset": { borderColor: "red", border: "1px solid red" },
    },
  };
  const inputLabel = {
    "&.Mui-focused": { color: "red" },
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubCategory(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetch("/softwareAndtoolsCategory.json").then((res) =>
      res.json().then((json) => setFetchedCategory(json))
    );
  }, []);

  // Event handler for category selection
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    // setSubCategory([]);
  };

  // Event handler for subcategory selection
  const handlePricingChange = (event) => {
    const pricingCategory = event.target.value;
    setPricing(pricingCategory);
  };

  const onSubmit = (data) => {
    setLoading(true);
    const title = data.title;
    const metaTitle = data.metaTitle;
    const description = data.description;
    const metaDescription = data.metaDescription;
    const choosenFile = data.choosenFile;
    const regularPrice = data.regularPrice;
    const discountPrice = data.discountPrice;
    const affiliateURL = data.affiliateURL;
    let payload = {};
    if (pricing == "Free") {
      payload = {
        title,
        metaTitle,
        description,
        metaDescription,
        pricing,
        category,
        affiliateURL,
        subCategories: subCategory,
        uploadedUserEmail: user?.email,
        briefDescription,
      };
    } else {
      payload = {
        title,
        metaTitle,
        description,
        metaDescription,
        pricing,
        category,
        affiliateURL,
        subCategories: subCategory,
        regularPrice,
        discountPrice,
        uploadedUserEmail: user?.email,
        briefDescription,
      };
    }

    const assestData = JSON.stringify(payload);
    const formData = new FormData();
    formData.append("file", choosenFile[0]);
    formData.append("data", assestData);
    try {
      axiosSecure
        .post(
          `${
            import.meta.env.VITE_axiosPublic
          }/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee/insert`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setLoading(false);

          reset();
          if (response.data.success) {
            Swal.fire({
              title: `${response?.data?.message}`,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#ff0000",
            });
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_err) => {
          setLoading(false);
          reset();
          Swal.fire({
            title: ` Something Went Wrong.`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#ff0000",
          });
        });
    } catch (error) {
      setLoading(false);
      reset();
      Swal.fire({
        title: ` Something Went Wrong.`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000",
      });
    }
  };

  return (
    <div className="rounded-lg my-10 flex flex-col items-center justify-center space-y-5">
      <Helmet>
        <title>Add Software & Tools</title>
      </Helmet>

      <div className="flex justify-start my-5  max-w-3xl mx-auto w-full">
        <Link
          to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/42439c1a1b7c8aa202928936a3166617c580039f6c99e745405e92c9cb54fdfa"
          className="flex justify-start items-center "
        >
          <FaArrowLeft className="text-2xl hover:text-[#ff0000] hover:cursor-pointer transition-colors duration-150" />
        </Link>
      </div>

      <H2Title baseText={"Add"} coloredText={"Software & Tools"}></H2Title>

      <div className="flex flex-row justify-center bg-white md:w-[750px] lg:w-[800px] mx-auto pt-5 pb-10">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full mx-auto">
          <div className="w-full flex flex-col md:flex-row gap-3 px-2 mb-6">
            {/* asset title-------------- */}
            <div className="flex-1 relative">
              <InputAssetTitle
                register={register}
                title={`title`}
                label={`Title`}
              />
              {errors.title && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="w-full relative flex-1">
              <InputAssetTitle
                register={register}
                title={`metaTitle`}
                label={`Meta Title`}
              />
              {errors.metaTitle && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.metaTitle.message}
                </span>
              )}
            </div>

            {/* meta title------------ */}
          </div>

          {/* test dynamic category and subcategory-------------------------- */}
          <div className="w-full flex flex-col md:flex-row gap-3 px-2 mb-6">
            <div className="flex-1 w-full">
              <FormControl
                className="w-full"
                size="small"
                sx={formControlInput}
              >
                <InputLabel sx={inputLabel} id="demo-select-small-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  className="w-full customSelect"
                  required
                  label="Category"
                  value={category}
                  onChange={handleCategoryChange}
                  sx={{
                    fieldset: { borderColor: "#cbd5e1" },
                  }}
                >
                  {fetchCategory?.map((dynamicCategory, index) => (
                    <MenuItem key={index} value={dynamicCategory?.categoryLink}>
                      {dynamicCategory.CategoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Render subcategory dropdown only when category is selected */}
            <div className="flex-1 w-full">
              <div className="flex flex-col">
                <FormControl
                  className="w-full"
                  size="small"
                  sx={formControlInput}
                >
                  <InputLabel sx={inputLabel} id="demo-select-small-label">
                    Subcategory
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    className="customSelect"
                    value={subCategory}
                    onChange={handleChange}
                    input={<OutlinedInput label="Subcategory" />}
                    MenuProps={MenuProps}
                    sx={{
                      fieldset: { borderColor: "#cbd5e1" },
                    }}
                  >
                    {fetchCategory?.map(
                      (subcat) =>
                        subcat?.categoryLink === category &&
                        subcat?.subCategories?.map((dynamicSubCat, index) => (
                          <MenuItem
                            key={index}
                            value={dynamicSubCat?.subCategoryName}
                            style={getStyles(name, subCategory, theme)}
                          >
                            {dynamicSubCat?.subCategoryName}
                          </MenuItem>
                        ))
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row px-2 gap-3 mb-6">
            {/*affiliateLink----------- */}

            <div className="w-full relative flex-1">
              <TextField
                size="small"
                className="w-full customTextField"
                {...register("affiliateURL", {
                  required: true,
                  pattern: {
                    value:
                      /^(?:https:\/\/)?(?:[\w-]+\.)+[A-Za-z]{2,}(?:\/[\w]+)*/gi,
                    message: "Invalid URL Format",
                  },
                })}
                id="outlined-basic"
                label="Affiliate URL"
                variant="outlined"
                sx={{
                  fieldset: { borderColor: "#cbd5e1" },
                }}
              />
              {errors.affiliateURL && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.affiliateURL.message}
                </span>
              )}
            </div>

            {/* Pricing title ------------ */}

            <div className=" flex-1  w-full">
              <FormControl
                className="w-full"
                size="small"
                sx={formControlInput}
              >
                <InputLabel sx={inputLabel} id="demo-select-small-label">
                  Pricing
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  className="w-full customTextField"
                  value={pricing}
                  required
                  label="Pricing"
                  onChange={handlePricingChange}
                  sx={{
                    fieldset: { borderColor: "#cbd5e1" },
                  }}
                >
                  {pricingArray?.map((pricingValue, index) => (
                    <MenuItem key={index} value={pricingValue}>
                      {pricingValue}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          {/* Pricing And Discount Filed--------- */}
          {(pricing == "Paid" || pricing == "Freemium") && (
            <div className="w-full flex flex-col md:flex-row px-2 gap-3 mt-4">
              {/* regular Price--------- */}

              <div className=" flex-1">
                <TextField
                  size="small"
                  className="w-full customTextField"
                  {...register("regularPrice", {
                    required: true,
                  })}
                  id="outlined-basic"
                  label="Regular Price"
                  type="number"
                  inputProps={{ 
                    step: "0.01", // Set step size for decimal precision
                    min: "0" // set lower limit
                  }} 
                  variant="outlined"
                  sx={{
                    fieldset: { borderColor: "#cbd5e1" },
                  }}
                />
              </div>

              {/* discount Price */}

              <div className=" flex-1">
                <TextField
                  size="small"
                  className="w-full customTextField"
                  {...register("discountPrice", {
                    required: true,
                  })}
                  type="number"
                  inputProps={{ 
                    step: "0.01", // Set step size for decimal precision
                    min: "0"      // set lower limit
                  }} 
                  id="outlined-basic"
                  label="Discount Price"
                  variant="outlined"
                  sx={{
                    fieldset: { borderColor: "#cbd5e1" },
                  }}
                />
              </div>
            </div>
          )}
          {/* file section ----------*/}
          <div className="relative m-2 md:mt-3">
            <input
              {...register("choosenFile", {
                required: true,
                pattern: /[0-9.]+/gm,
              })}
              type="file"
              multiple
              placeholder="File"
              className={`h-14 py-4 ${assetNaltClass}`}
            />
            <label className={labelClass}>File</label>
          </div>
          {/* Description */}
          <div className="w-full flex flex-col md:flex-row mb-6">
            <div className="relative m-2 md:my-3 flex-1">
              <textarea
                {...register("description", {
                  required: true,
                  pattern: {
                    message: "Invalid description",
                    value: /^[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=]+$/gm,
                  },
                })}
                type="text"
                placeholder="Description"
                className={textAreaClass}
              />
              <label className={labelClass}>Description</label>
              {errors.description && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[11px] left-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* metaDesc */}
            <div className="relative m-2 md:my-3 flex-1">
              <textarea
                // eslint-disable-next-line no-useless-escape
                {...register("metaDescription", {
                  required: true,
                  pattern: {
                    value:
                      /^[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=]+(?=\b\w+\b){0,60}$/gm,
                    message: "Invalid Meta Description Format",
                  },
                })}
                type="text"
                placeholder="Meta Description"
                className={textAreaClass}
              />
              <label className={labelClass}>Meta Description</label>
              {errors.metaDescription && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[11px] left-1">
                  {errors.metaDescription.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-[98%] mx-auto">
            <ReactQuill
              theme="snow"
              value={briefDescription}
              onChange={setBriefDescription}
            />
          </div>
          <div className="blog-post">{parse(briefDescription)}</div>
          <div className="flex items-center justify-center mt-5">
            <PrimaryButtonSmaill
              type="submit"
              text={loading ? "Uploading..." : "Upload"}
            />
          </div>
        </form>

        {/* ------------ */}
      </div>
    </div>
  );
};

const labelClass =
  "absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-[#666666] transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[16px] peer-autofill:-top-2 peer-required:after:text-pink-500  peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent";

const textAreaClass =
  "peer relative h-40 w-full rounded border border-slate-300 px-2 pt-2 text-sm text-black placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 hover:border-[#ff0000] invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";
("peer relative h-28 w-full rounded border border-slate-300 px-2 pt-2 text-base text-black placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 focus:font-bold invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none");

const assetNaltClass =
  " peer relative w-full rounded border border-slate-300 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white hover:border-[#ff0000] invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";
export default AddSoftwares;
