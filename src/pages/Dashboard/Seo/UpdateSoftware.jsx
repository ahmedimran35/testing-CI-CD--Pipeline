import { Helmet } from "react-helmet-async";
import H2Title from "../../../components/Titles/H2Title";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import PrimaryButtonSmaill from "../../../components/buttons/PrimaryButtonSmall/PrimaryButtonSmaill";
import "./border.css";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

import { useNavigate, useParams } from "react-router";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/isLoading/Loading";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
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

const UpdateSoftwareAndTools = () => {
  const { user } = useAuth();
  const { toolsId } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [fetchCategory, setFetchedCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [pricing, setPricing] = useState("");
  const pricingArray = ["Free", "Freemium", "Paid"];
  // react quill
  const [briefDescription, setBriefDescription] = useState("");
  const navigate = useNavigate();
  const formControlInput = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "red" },
      "&.Mui-focused fieldset": { borderColor: "red", border: "1px solid red" },
    },
  };
  const inputLabel = {
    "&.Mui-focused": { color: "red" },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await axiosPublic.get(
        `/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee/details-by-seo/${toolsId}`
      );
      const data = res?.data?.data;
      setBriefDescription(data?.briefDescription || "");

      return {
        title: data?.title,
        metaTitle: data?.metaTitle,
        category: data?.category,
        description: data?.description,
        metaDescription: data?.metaDescription,
        pricing: data?.pricing,
        affiliateURL: data?.affiliateURL,
        regularPrice: data?.regularPrice,
        discountPrice: data?.discountPrice,
      };
    },
  });
  const {
    data: softwareDetails = {},
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [toolsId, "update-software-and-tools"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee/details-by-seo/${toolsId}`
      );

      // setFetchedCategory(res?.data?.data?.subCategories);
      return res?.data?.data;
    },
  });

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
    // const pricing = data.pricing;
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
        pricing: pricing ? pricing : softwareDetails?.pricing,
        category: category ? category : softwareDetails?.category,
        affiliateURL,
        subCategories: subCategory.length
          ? subCategory
          : softwareDetails?.subCategories,
        uploadedUserEmail: user?.email,
        public_id: softwareDetails?.public_id,
        briefDescription: briefDescription || "",
      };
    } else {
      payload = {
        title,
        metaTitle,
        description,
        metaDescription,
        pricing: pricing ? pricing : softwareDetails?.pricing,
        category: category ? category : softwareDetails?.category,
        affiliateURL,
        subCategories: subCategory.length
          ? subCategory
          : softwareDetails?.subCategories,
        regularPrice: regularPrice
          ? parseInt(regularPrice)
          : softwareDetails?.regularPrice,
        discountPrice,
        uploadedUserEmail: user?.email,
        public_id: softwareDetails?.public_id,
        briefDescription: briefDescription || "",
      };
    }

    const assestData = JSON.stringify(payload);
    const formData = new FormData();
    formData.append("file", choosenFile[0]);
    formData.append("data", assestData);
    try {
      axiosSecure
        .patch(
          `${
            import.meta.env.VITE_axiosPublic
          }/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee/${toolsId}`,
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
            navigate(
              "/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/42439c1a1b7c8aa202928936a3166617c580039f6c99e745405e92c9cb54fdfa"
            );
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_err) => {
          reset();
          setLoading(false);
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
  // const defaultDescription = "h2>headu</h2><p>judhdhdjyh</p><p><br></p><p>ki<strong>chu</strong></p>"; // Set your desired default text here
  if (isLoading || isPending) return <Loading isLoading={true} />;

  return (
    <div className=" rounded-lg flex flex-col items-center justify-center space-y-10 mt-20">
      <Helmet>
        <title>Update Software & Tools</title>
      </Helmet>

      <div className="flex justify-start my-5  md:mt-20 lg:mt-0 max-w-3xl mx-auto w-full">
        <Link
          to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/42439c1a1b7c8aa202928936a3166617c580039f6c99e745405e92c9cb54fdfa"
          className="flex justify-start items-center "
        >
          <FaArrowLeft className="text-2xl hover:text-[#ff0000] hover:cursor-pointer transition-colors duration-150" />
        </Link>
      </div>

      <H2Title baseText={"Update"} coloredText={"Software & Tools"}></H2Title>

      <div className="flex flex-row justify-center bg-white md:w-[750px] lg:w-[800px] mx-auto pt-5 pb-14 ">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full mx-auto">
          <div className="w-full flex flex-col md:flex-row md:mb-6 gap-3 px-2">
            {/* asset title-------------- */}
            <div className="w-full relative flex-1">
              <InputAssetTitle
                register={register}
                title={`title`}
                label={`Title`}
              />
              {/* show error for title field  */}
              {errors.title && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="w-full relative flex-1">
              <TextField
                size="small"
                autoFocus={true}
                className="w-full customTextField"
                {...register("metaTitle", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z\s:-]+$/g,
                    message: "Invalid Title Format",
                  },
                })}
                id="metaTitle"
                label="Meta Title"
                inputLableProps={{ shrink: true }}
                variant="outlined"
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
          <div className="w-full flex flex-col md:flex-row gap-3 px-2 my-3">
            <div className="flex-1 w-full">
              <FormControl
                sx={formControlInput}
                className="w-full"
                size="small"
              >
                <InputLabel sx={inputLabel} id="demo-select-small-label">
                  Category
                </InputLabel>
                <Select
                  inputLableProps={{ shrink: true }}
                  autoFocus={true}
                  // size="small"
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // value={}
                  className="w-full customTextField"
                  label="Category"
                  value={category ? category : softwareDetails?.category}
                  defaultValue={softwareDetails?.category}
                  onChange={handleCategoryChange}
                >
                  {fetchCategory?.map((dynamicCategory, index) => (
                    <MenuItem
                      key={index}
                      value={
                        dynamicCategory?.categoryLink
                          ? softwareDetails?.category
                          : dynamicCategory?.categoryLink
                      }
                    >
                      {dynamicCategory.CategoryName
                        ? softwareDetails?.category
                        : dynamicCategory.CategoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Render subcategory dropdown only when category is selected */}
            <div className="flex-1 w-full">
              <div className="flex flex-col">
                <FormControl
                  sx={formControlInput}
                  className="w-full"
                  size="small"
                >
                  <InputLabel sx={inputLabel} id="demo-multiple-name-label">
                    Subcategory
                  </InputLabel>
                  <Select
                    inputLableProps={{ shrink: true }}
                    autoFocus={true}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={subCategory}
                    onChange={handleChange}
                    input={<OutlinedInput label="Subcategory" />}
                    MenuProps={MenuProps}
                  >
                    {fetchCategory?.map(
                      (subcat) =>
                        subcat?.categoryLink ===
                          (category || softwareDetails?.category) &&
                        subcat?.subCategories?.map((dynamicSubCat, index) => (
                          <MenuItem
                            key={index}
                            value={dynamicSubCat?.subCategoryLink}
                          >
                            {dynamicSubCat?.subCategoryName}
                          </MenuItem>
                        ))
                    )}
                  </Select>
                </FormControl>
                {subCategory.length > 0 ? (
                  ""
                ) : (
                  <div className="text-xs flex flex-wrap gap-[2px] pt-[2px]">
                    Selected Sub Categories:{" "}
                    {softwareDetails?.subCategories
                      ? softwareDetails?.subCategories.map((singleSub, i) => (
                          <p
                            className="inline bg-[#ff0000] rounded p-[1px] mr-[2px] text-white"
                            key={i}
                          >
                            {singleSub}{" "}
                          </p>
                        ))
                      : ""}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* file section ----------*/}
          <div className="relative m-2 md:my-4 md:mb-6 flex flex-row justify-between">
            <input
              {...register("choosenFile")}
              type="file"
              multiple
              placeholder="File"
              className={`h-14 py-4 ${assetNaltClass}`}
            />
            <img
              className="w-[14%] h-14 rounded"
              src={softwareDetails?.url}
              alt=""
            />
            <label className={labelClass}>File</label>
          </div>
          <div className="w-full flex flex-col md:flex-row md:mb-6 px-2 gap-3">
            {/*affiliateLink----------- */}

            <div className="w-full relative flex-1">
              <TextField
                color="error"
                autoFocus={true}
                inputLableProps={{ shrink: true }}
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
                id="affiliateURL"
                label="Affiliate URL"
                variant="outlined"
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
                sx={formControlInput}
                className="w-full"
                size="small"
              >
                <InputLabel sx={inputLabel} id="demo-select-small-label">
                  Pricing
                </InputLabel>
                <Select
                  inputLableProps={{ shrink: true }}
                  // size="small"
                  autoFocus={true}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  className="w-full customTextField"
                  value={pricing ? pricing : softwareDetails?.pricing}
                  defaultValue={pricing ? pricing : softwareDetails?.pricing}
                  label="Pricing"
                  onChange={handlePricingChange}
                >
                  {pricingArray?.map((pricingValue, index) => (
                    <MenuItem
                      key={index}
                      value={
                        pricingValue ? pricingValue : softwareDetails?.pricing
                      }
                      defaultValue={
                        pricingValue ? pricingValue : softwareDetails?.pricing
                      }
                    >
                      {pricingValue ? pricingValue : softwareDetails?.pricing}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          {/* Pricing And Discount Filed--------- */}
          {((pricing || softwareDetails?.pricing) == "Paid" ||
            (pricing || softwareDetails?.pricing) == "Freemium") && (
            <div className="w-full flex flex-col md:flex-row px-2 gap-3 mt-4">
              {/* regular Price--------- */}

              <div className=" flex-1">
                <TextField
                  inputLableProps={{ shrink: true }}
                  // color="error"
                  autoFocus={true}
                  size="small"
                  className="w-full customTextField"
                  {...register("regularPrice", {
                    required: true,
                  })}
                  id="regularPrice"
                  label="Regular Price"
                  type="number"
                  inputProps={{ 
                    step: "0.01", // Set step size for decimal precision
                    min: "0"      // set lower limit
                  }} 
                  variant="outlined"
                />
              </div>

              {/* discount Price */}

              <div className=" flex-1">
                <TextField
                  // color="error"
                  inputLableProps={{ shrink: true }}
                  autoFocus={true}
                  size="small"
                  className="w-full customTextField"
                  {...register("discountPrice", {
                    required: true,                  
                  })}
                  inputProps={{ 
                    step: "0.01", // Set step size for decimal precision
                    min: "0"      // set lower limit
                  }} 
                  type="number"
                  id="discountPrice"
                  label="Discount Price"
                  variant="outlined"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="w-full flex flex-col md:flex-row">
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
              defaultValue={softwareDetails?.briefDescription}
              value={briefDescription}
              onChange={setBriefDescription}
            />
          </div>
          <div className="blog-post">{parse(briefDescription)}</div>

          <div className="flex items-center justify-center mt-10">
            <PrimaryButtonSmaill
              type="submit"
              text={loading ? "Processing..." : "Update"}
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
  " peer relative w-[85%] rounded border border-slate-300 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white hover:border-[#ff0000] invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";
export default UpdateSoftwareAndTools;
