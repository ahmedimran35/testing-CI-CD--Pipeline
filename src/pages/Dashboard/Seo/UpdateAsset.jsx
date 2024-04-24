import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import H2Title from "../../../components/Titles/H2Title";
import PrimaryButtonSmaill from "../../../components/buttons/PrimaryButtonSmall/PrimaryButtonSmaill";
import InputTag from "./TagsInput/InputTag";

import { Helmet } from "react-helmet-async";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/isLoading/Loading";

import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import InputAssetTitle from "../../../components/InputFields/InputAssetTitle/InputAssetTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const UpdateAsset = () => {
  const { assetId } = useParams();
  const [fetcheCategory, setFetchedCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  // const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // getting category and sub category
  useEffect(() => {
    fetch("/categoryList.json").then((res) =>
      res.json().then((json) => setFetchedCategory(json))
    );
  }, []);
  const {
    data: assetDetail = {},
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [assetId, "details-seo"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/details-check-by-seo/${assetId}`
      );
      return res?.data?.data;
    },
    staleTime: 60000, // Refetch data after 1 minute of inactivity
    cacheTime: 6000000, // Remove data from cache after 100 minute (optional)
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      try {
        const res = await axiosSecure.get(
          `/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/details-check-by-seo/${assetId}`
        );
        const data = res?.data?.data;

        const defaultTags = Object?.values(data?.tags) ?? []; // Use default if tags are missing
        setTags(defaultTags);

        return {
          title: data?.title ?? "",
          metaTitle: data?.metaTitle ?? "",
          category: data?.category ?? "",
          subCategory: data?.subCategory ?? "",
        };
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
  });
  const watchingCategory = watch("category");

  const onAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const onDeleteTag = (tag) => {
    let remainingTags = tags?.filter((t) => {
      return t !== tag;
    });

    setTags([...remainingTags]);
  };

  if (isLoading || isPending) return <Loading isLoading={true} />;
  const onSubmit = async (data) => {
    setLoading(true);
    const choosenFile = data.choosenFile;

    const payload = {
      title: data.title,
      metaTitle: data.metaTitle,
      description: data.description,
      metaDescription: data.metaDescription,
      alternativeText: data.alternativeText,
      category: data?.category,
      subCategory: data?.subCategory,
      tags: tags.length ? tags : assetDetail?.tags,
      public_id: data?.public_id,
    };

    if (tags.length < 1) {
      Swal.fire({
        title: `Please input tags`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000",
      });
      return;
    }

    const assetData = JSON.stringify(payload);
    const formData = new FormData();
    formData.append("file", choosenFile[0]);
    formData.append("data", assetData);
    try {
      axiosSecure
        .patch(
          `${
            import.meta.env.VITE_axiosPublic
          }/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/${assetId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setLoading(false);

          if (response?.data?.success) {
            Swal.fire({
              title: `${response?.data?.message}`,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#ff0000",
            });
            navigate(
              "/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/46bade64727b5046da39635eea8448e552d31d9009829b919ffc96e65847fc88"
            );
          }
        });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: ` Something Went Wrong.`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000",
      });
    }
  };

  return (
    <div className="p-10  md:h-fit rounded-lg flex flex-col items-center justify-center space-y-10">
      <Helmet>
        <title>Update Asset</title>
      </Helmet>
      <div className="flex justify-start my-5  max-w-3xl mx-auto w-full">
        <Link
          to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/46bade64727b5046da39635eea8448e552d31d9009829b919ffc96e65847fc88"
          className="flex justify-start items-center "
        >
          <FaArrowLeft className="text-2xl hover:text-[#ff0000] hover:cursor-pointer transition-colors duration-150" />
        </Link>
      </div>
      <H2Title baseText={"Update"} coloredText={"Asset"}></H2Title>

      <div className="flex flex-row justify-center bg-white lg:w-[800px] mx-auto pb-18">
        <form className=" w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <div className="w-full flex flex-col lg:flex-row lg:gap-4">
            {/* asset title */}

            <div className="relative my-2 lg:mb-6 flex-1">
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
            {/* meta title */}
            <div className="relative my-2 lg:mb-6 flex-1">
              <input
                {...register("metaTitle", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z\s:-]+$/g,
                    message: "Invalid Title Format",
                  },
                })}
                type="text"
                placeholder="Meta Title"
                className={inputClass}
              />
              <label className={labelClass}>Meta Title</label>
              {errors.metaTitle && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.metaTitle.message}
                </span>
              )}
            </div>
          </div>
          {/*Tags Input*/}
          {/* tags */}
          <InputTag
            onAddTag={onAddTag}
            onDeleteTag={onDeleteTag}
            defaultTags={tags ?? [""]}
            placeholder="Use space to add multiple tags"
          />

          {/* test dynamic category and subcategory */}
          <div className="w-full flex flex-col lg:flex-row md:gap-1 lg:gap-4">
            <div className="relative my-2 lg:mb-6 md:w-full">
              <select
                {...register("category", { required: true })}
                className={categoryClass}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {fetcheCategory?.map((dynamicCategory, index) => (
                  <option
                    key={index}
                    value={
                      dynamicCategory?.categoryLink
                        ? dynamicCategory?.categoryLink
                        : assetDetail?.category
                    }
                  >
                    {dynamicCategory.CategoryName
                      ? dynamicCategory.CategoryName
                      : assetDetail?.category}
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

            {(assetDetail?.category !== "icon" ||
              watchingCategory !== "icon") && (
              <div className="relative my-2 lg:mb-6 lg:w-full">
                <select className={categoryClass} {...register("subCategory")}>
                  {fetcheCategory?.map(
                    (subcat) =>
                      subcat?.categoryLink === watchingCategory &&
                      subcat?.subCategories?.map((dynamicSubCat) => (
                        <option
                          key={dynamicSubCat?.subCategoryLink}
                          value={dynamicSubCat?.subCategoryLink}
                        >
                          {dynamicSubCat?.subCategoryName}
                        </option>
                      ))
                  )}
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
          {/* File */}
          <div className="relative my-3 flex flex-row justify-between gap-1 lg:gap-0">
            <input
              {...register("choosenFile")}
              type="file"
              multiple
              placeholder="File"
              className={`h-14 py-4 w-[70%] lg:w-[88%] ${assetNaltClass}`}
            />
            <label className={labelClass}>File</label>
            <img
              src={assetDetail?.url}
              className="w-[25%] lg:w-[10%] h-14 rounded-md"
              alt=""
            />
          </div>

          <div className="relative mt-4">
            {/* alternative */}
            <input
              {...register("alternativeText", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z\s]+$/g,
                  message: "Invalid Alternative Text Format",
                },
              })}
              type="text"
              placeholder="Alternative Text"
              defaultValue={assetDetail?.alternativeText}
              className={`h-10 ${assetNaltClass}`}
            />
            <label className={labelClass}>Alternative Text</label>
            {errors.alternativeText && (
              <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                {errors.alternativeText.message}
              </span>
            )}
          </div>
          {/* Description */}
          <div className="w-full flex lg:gap-4 flex-col lg:flex-row">
            {(assetDetail?.category !== "icon" ||
              watchingCategory !== "icon") && (
              <div className="relative flex-1 mt-6 lg:mb-6">
                {/* assetDesc */}
                <textarea
                  {...register("description", {
                    required: true,
                    pattern: {
                      value: /^[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=]+$/gm,
                      message: "Invalid Description Format",
                    },
                  })}
                  type="text"
                  placeholder="Asset Description"
                  className={textAreaClass}
                  defaultValue={assetDetail?.description}
                />
                <label className={labelClass}>Asset Description</label>
                {errors.description && (
                  <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                    {errors.description.message}
                  </span>
                )}
              </div>
            )}

            {/* metaDesc */}
            <div className="relative mt-6 flex-1 lg:mb-6">
              <textarea
                {...register("metaDescription", {
                  required: true,
                  pattern: {
                    value:
                      /^[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=]+(?=\b\w+\b){0,60}$/gm,
                    message: "Invalid Meta Description Format",
                  },
                })}
                type="text"
                defaultValue={assetDetail?.metaDescription}
                placeholder="Meta Description"
                className={textAreaClass}
              />
              <label className={labelClass}>Meta Description</label>
              {errors.metaDescription && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.metaDescription.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-center">
            <PrimaryButtonSmaill
              type="submit"
              text={loading ? "Processing..." : "Update"}
            />
          </div>
        </form>
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

export default UpdateAsset;
