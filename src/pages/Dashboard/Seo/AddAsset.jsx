import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import H2Title from "../../../components/Titles/H2Title";
import PrimaryButtonSmaill from "../../../components/buttons/PrimaryButtonSmall/PrimaryButtonSmaill";
import InputTag from "./TagsInput/InputTag";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import InputAssetTitle from "../../../components/InputFields/InputAssetTitle/InputAssetTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddAsset = () => {
  const { user } = useAuth();
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const watchCategory = watch("category");
  const [loading, setLoading] = useState(false);
  const [fetcheCategory, setFetchedCategory] = useState([]);
  const [tags, setTags] = useState([]);
  // const axios = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onAddTag = (tag) => {
    if (tags.length < 3) {
      setTags([...tags, tag]);
    }
  };

  const onDeleteTag = (tag) => {
    let remainingTags = tags?.filter((t) => {
      return t !== tag;
    });

    setTags([...remainingTags]);
  };

  const getSubCategories = () => {
    if (!watchCategory) return [];
    return (
      fetcheCategory?.find((item) => item.categoryLink === watchCategory)
        ?.subCategories || []
    );
  };

  // getting category and sub category
  useEffect(() => {
    fetch("/categoryList.json").then((res) =>
      res.json().then((json) => setFetchedCategory(json))
    );
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    const title = data.title;
    const metaTitle = data.metaTitle;
    const description = watchCategory == "icon" ? null : data.assetDesc;
    const metaDescription = data.metaDesc;
    const choosenFile = data.choosenFile;
    const category = data.category;
    const subCategory = watchCategory == "icon" ? null : data.subCategory;
    const alternativeText = data.alternativeText;

    if (tags.length < 1) {
      Swal.fire({
        title: `Please input tags`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000",
      });
      return;
    }

    const asset = {
      title,
      metaTitle,
      description,
      metaDescription,
      alternativeText,
      category,
      subCategory,
      tags,
      uploadedUserEmail: user?.email,
    };
    const assestData = JSON.stringify(asset);
    const formData = new FormData();
    formData.append("file", choosenFile[0]);
    formData.append("data", assestData);
    try {
      axiosSecure
        .post(
          `${
            import.meta.env.VITE_axiosPublic
          }/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/insert`,
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
    <div className=" rounded-lg flex flex-col items-center justify-center space-y-5">
      <Helmet>
        <title>Add Asset</title>
      </Helmet>

      <div className="flex justify-start max-w-3xl mx-auto my-5 w-full">
        <Link
          to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/46bade64727b5046da39635eea8448e552d31d9009829b919ffc96e65847fc88"
          className="flex justify-start items-center "
        >
          <FaArrowLeft className="text-2xl hover:text-[#ff0000] hover:cursor-pointer transition-colors duration-150" />
        </Link>
      </div>

      <H2Title baseText={"Add"} coloredText={"Asset"}></H2Title>
      <div className="flex flex-row justify-center bg-white md:w-[750px] lg:w-[800px] mx-auto pb-16 ">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full mx-auto">
          {/* title */}
          <div className="w-full relative flex flex-col md:flex-row">
            {/* asset title */}

            <div className="relative m-2 md:mb-5 flex-1">
              <InputAssetTitle
                register={register}
                title={`title`}
                label={`Title`}
                defaultValue={""}
              />
              {errors.title && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* meta title */}
            <div className="relative m-2 md:mb-5 flex-1">
              <InputAssetTitle
                register={register}
                title={`metaTitle`}
                label={`Meta Title`}
                defaultValue={""}
              />
              {errors.metaTitle && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.metaTitle.message}
                </span>
              )}
            </div>
          </div>

          {/* test dynamic category and subcategory-------------------------- */}
          <div className="w-full flex flex-col md:flex-row">
            <div className="relative m-2 md:mb-6 md:w-full">
              <select
                {...register("category", { required: true })}
                className={categoryClass}
              >
                <option selected disabled>
                  Select Category
                </option>
                {fetcheCategory?.map((dynamicCategory, index) => (
                  <option key={index} value={dynamicCategory?.categoryLink}>
                    {dynamicCategory.CategoryName}
                  </option>
                ))}
              </select>
              <label className={labelClass}>Select Category</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-[#ff0000] peer-disabled:cursor-not-allowed"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-labelledby="title-04 description-04"
                role="graphics-symbol"
              >
                <title id="title-04">Arrow Icon</title>
                <desc id="description-04">Arrow icon of the select list.</desc>
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Render subcategory dropdown only when category is selected */}
            {watchCategory !== "icon" && (
              <div className="relative m-2 md:mb-6 md:w-full">
                <select
                  className={categoryClass}
                  {...register("subCategory", {
                    required: watchCategory == "icon" ? false : true,
                  })}
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                  {/* <option selected disabled>
                  Select Subcategory
                </option> */}
                  {getSubCategories()?.map((subCategory) => (
                    <option
                      selected
                      key={subCategory.subCategoryName}
                      value={subCategory.subCategoryLink}
                    >
                      {subCategory.subCategoryName}
                    </option>
                  ))}
                </select>
                <label className={labelClass}>Select Subcategory</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-[#ff0000] peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-04 description-04"
                  role="graphics-symbol"
                >
                  <title id="title-04">Arrow Icon</title>
                  <desc id="description-04">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* ----------------------------- */}
          {/* input field */}
          {/* file section */}
          <div className="relative m-2 md:mb-6">
            <input
              {...register("choosenFile", { required: true })}
              type="file"
              multiple
              placeholder="File"
              className={`h-14 py-4 ${assetNaltClass}`}
            />
            <label className={labelClass}>File</label>
          </div>
          {/* alternative text for image */}
          <div className="w-full flex flex-col md:flex-row">
            <div className="relative m-2 md:mb-6 flex-1">
              {/* alternative */}

              <InputAssetTitle
                register={register}
                title={`alternativeText`}
                label={`Alternative Text`}
                defaultValue={""}
              />

              {errors.alternativeText && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.alternativeText.message}
                </span>
              )}
            </div>

            {/*Tags Input*/}
            {/* tags */}
            <div className="relative m-2 md:mb-6 flex-1">
              <InputTag
                onAddTag={onAddTag}
                onDeleteTag={onDeleteTag}
                defaultTags={tags}
                placeholder="Asset Tags"
                inputClass={inputClass}
              />
            </div>
          </div>
          {/* Description */}
          <div className="w-full flex flex-col md:flex-row">
            {watchCategory !== "icon" && (
              <div className="relative m-2 md:mb-6 flex-1">
                {/* assetDesc */}
                <textarea
                  {...register("assetDesc", {
                    required: watchCategory == "icon" ? false : true,
                    pattern: {
                      value: /^[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=]+$/gm,
                      message: "Invalid Description Format",
                    },
                  })}
                  type="text"
                  placeholder="Asset Description"
                  className={textAreaClass}
                />
                <label className={labelClass}>Asset Description</label>
                {errors.assetDesc && (
                  <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                    {errors.assetDesc.message}
                  </span>
                )}
              </div>
            )}

            {/* metaDesc */}
            <div className="relative m-2 md:mb-6 flex-1">
              <textarea
                {...register("metaDesc", {
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
              {errors.metaDesc && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.metaDesc.message}
                </span>
              )}
            </div>
          </div>
          <div className="md:w-[750px] lg:w-[800px] mx-auto px-4">
            {/*        
            {loading && <FileUploadLoadingSpine />} */}
          </div>
          <div className="flex items-center justify-center mt-10">
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

const inputClass =
  "peer relative h-10 w-full rounded border border-slate-300 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";

const labelClass =
  "absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500  peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent";

const textAreaClass =
  "peer relative h-28 w-full rounded border border-slate-300 px-4 pt-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";
("peer relative h-28 w-full rounded border border-slate-300 px-4 pt-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none");

const categoryClass =
  "peer relative h-10 w-full appearance-none rounded border border-slate-300 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-[#ff0000] focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

const assetNaltClass =
  " peer relative w-full rounded border border-slate-300 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";

export default AddAsset;
