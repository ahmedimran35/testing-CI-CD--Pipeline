import { Helmet } from "react-helmet-async";
import H2Title from "../../../../components/Titles/H2Title";
import PrimaryButtonSmaill from "../../../../components/buttons/PrimaryButtonSmall/PrimaryButtonSmaill";
import ReactQuill from "react-quill";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// import parse from "html-react-parser";
import { useState } from "react";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddImportantPages = () => {
  const { user } = useAuth();
  // const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const formControlInput = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "red" },
      "&.Mui-focused fieldset": { borderColor: "red", border: "1px solid red" },
    },
  };
  const inputLabel = {
    "&.Mui-focused": { color: "red" },
  };

  const [pageInfo, setPageInfo] = useState("");
  const [selectedPageCategory, setSelectedPageCategory] = useState("");

  const staticPageCategory = [
    { pageName: "Information" },
    { pageName: "Legal" },
    { pageName: "Support" },
  ];
  const handlePageCategoryChange = (e) => {
    const selectedPageCategory = e.target.value;
    setSelectedPageCategory(selectedPageCategory);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const pageName = data.pageName;
    const pageCategory = selectedPageCategory;
    const pageContent = pageInfo;
    const payload = {
      pageName,
      category: pageCategory,
      content: pageContent,
    };

    try {
      const result = await axiosSecure.post(
        "/e51210ce250c2139111c7f61be481cc034f2b5c0fedbe3c5d8ff69949d04a936",
        payload
      );
      if (result?.data?.success) {
        reset();
        Swal.fire({
          title: `${result?.data?.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#ff0000",
        });
      } else {
        reset();
        Swal.fire({
          title: `${result?.data?.message}`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#ff0000",
        });
      }
    } catch (error) {
      reset();
      Swal.fire({
        title: `${error?.response?.data?.message}`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000",
      });
    }

    setLoading(false);
  };
  return (
    <div className="rounded-lg my-10 flex flex-col items-center justify-center space-y-5">
      <Helmet>
        <title>Add Software & Tools</title>
      </Helmet>

      <div className="flex justify-start my-5  max-w-3xl mx-auto w-full">
        <Link
          to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/dd6c71448dfe05bfa1c2bbd71cab1db5cdc1292615133c8adb6d988e2bc138d4"
          className="flex justify-start items-center "
        >
          <FaArrowLeft className="text-2xl hover:text-[#ff0000] hover:cursor-pointer transition-colors duration-150" />
        </Link>
      </div>
      <H2Title baseText={"Add"} coloredText={"Important Pages"}></H2Title>

      {/* ------------------------------------- */}
      <div className="flex flex-row justify-center bg-white md:w-[750px] lg:w-[800px] mx-auto pt-5 pb-10">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full mx-auto">
          <div className="w-full flex flex-col md:flex-row gap-3 px-2 mb-6">
            <div className="flex-1 relative">
              {/* page name  */}
              <TextField
                size="small"
                className="w-full customTextField"
                {...register("pageName", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z\s]+$/g,
                    message: "Invalid Page Name Format",
                  },
                })}
                id="outlined-basic"
                label="Page Name"
                variant="outlined"
                sx={{
                  fieldset: { borderColor: "#cbd5e1" },
                }}
              />
              {errors.pageName && (
                <span className="error-message text-red-500 absolute text-xs -bottom-[17px] left-1">
                  {errors.pageName.message}
                </span>
              )}
            </div>

            <div className="w-full relative flex-1">
              <FormControl
                className="w-full"
                size="small"
                sx={formControlInput}
              >
                <InputLabel sx={inputLabel} id="demo-select-small-label">
                  Page Category
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  className="w-full customSelect"
                  required
                  label="Page Category"
                  value={selectedPageCategory}
                  onChange={handlePageCategoryChange}
                  sx={{
                    fieldset: { borderColor: "#cbd5e1" },
                  }}
                >
                  {staticPageCategory?.map((dynamicPageCategory, index) => (
                    <MenuItem key={index} value={dynamicPageCategory?.pageName}>
                      {dynamicPageCategory.pageName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="w-[98%] mx-auto">
            <ReactQuill theme="snow" value={pageInfo} onChange={setPageInfo} />
          </div>
          {/* <div className="blog-post">{parse(pageInfo)}</div> */}
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

export default AddImportantPages;
