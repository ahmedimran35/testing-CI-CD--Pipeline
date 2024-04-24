import { useForm } from "react-hook-form";
import ScrollToTop from "../../../ScrollToTheTop/ScrollToTheTop";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";

const Feedback = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    const email = user?.email;
    const reason = data?.reason;
    const message = data?.reasonDescription;
    const file = data?.images;
    setLoading(true);
    const payload = {
      email,
      reason,
      message,
    };
    const feedbackData = JSON.stringify(payload);
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", feedbackData);

    try {
      axiosPublic
        .post(
          `${
            import.meta.env.VITE_axiosPublic
          }/59bda3f8ee98128d543572e0d29f27ad5343f0c88c36e7bf4672c4c3ab6245b4`,
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
              position: "center",
              icon: "success",
              title: "Thank you for your feedback!",
              text: "We appreciate the time you took to help us improve. If necessary, we'll get in touch with you soon. Meanwhile, feel free to check our FAQ or use the chat for instant answers to common questions. Thank you for helping us make YT Shops even more awesome for our creator community!",
              showConfirmButton: false,
              timer: 3500,
            });
          }
        })
        .catch(() => {
          // console.log(_err);
          setLoading(false);
          reset();
          Swal.fire({
            title: ` Something Went  Wrong.`,
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
    <div className="my-10 flex flex-col items-center justify-center space-y-5">
      <ScrollToTop />
      <h1 className="text-lg md:text-2xl font-semibold text-zinc-600">
        Send Your <span className="text-[#ff0000]">Feedback </span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        {/* Your email input */}
        <div className="relative my-[2px]">
          <input
            defaultValue={user?.email}
            disabled
            {...register("email")}
            type="email"
            placeholder="Asset Title"
            className={`${emailInput} hover:cursor-not-allowed`}
          />
          <label className={`${inputClass} bg-white rounded h-fit`}>
            Your Contact Information
          </label>
        </div>

        {/* Your Reason input */}
        <div className="relative my-[2px]">
          <select required className={selectClass} {...register("reason")}>
            {/* <option selected disabled>
              Select Reason
            </option> */}
            <option value="generalFeedback">General Feedback</option>
            <option value="featureSuggestion">Feature Suggestion</option>
            <option value="bugReport">Bug Report</option>
            <option value="compliment">Compliment</option>
            <option value="complaint">Complaint</option>
          </select>
          <label className={selectLabelClass}>How Can We Help You Today?</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute top-[18px] right-5 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-[#ff0000] peer-disabled:cursor-not-allowed"
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

        {/*<!-- Component: Rounded base sized file input with leading icon --> */}

        {/*<!-- Component: Rounded large file input --> */}
        <div className="relative my-6">
          <input
            id="id-file02"
            type="file"
            name="id-file02"
            {...register("images")}
            className="peer relative w-full rounded border border-slate-300 px-4 py-3 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 [&::file-selector-button]:hidden"
          />
          <label
            htmlFor="id-file02"
            className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Show Us What&apos;s Happening
          </label>
        </div>
        {/*<!-- End Rounded large file input --> */}

        {/*<!-- End Rounded base sized file input with leading icon --> */}

        {/* Write Your Concern textarea */}
        <div className="relative my-[2px]">
          <textarea
            {...register("reasonDescription", {
              required: true,
              pattern: {
                value: /^[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=]+(?=\b\w+\b){0,60}$/gm,
                message: "Invalid description Format",
              },
            })}
            type="text"
            placeholder="Please provide as much detail as possible..."
            className={textareaClass}
          />
          <label className={inputClass}>
            Please provide as much detail as possible.
          </label>
        </div>
        {/*<!-- Component: Dropzone file input --> */}

        {/*<!-- End Dropzone file input --> */}
        <div className="flex justify-center">
          <input
            className={submitButton}
            type="Submit"
            defaultValue={`${loading ? "processing..." : "Send Feedback"}`}
          />
        </div>
      </form>
    </div>
  );
};

const submitButton =
  "inline-flex items-center justify-center px-3 py-2 md:px-6 md:py-[10px] text-xs md:text-[12px] lg:text-[15px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl uppercase hover:cursor-pointer";

const selectClass =
  "peer relative h-14 w-full appearance-none rounded border border-slate-300 bg-white px-4 text-base text-slate-600 outline-none transition-all autofill:bg-white focus:border-[#ff0000] focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

const selectLabelClass =
  "absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500  peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent";

const inputClass =
  "absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-600 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-600 peer-disabled:before:bg-transparent";

const emailInput =
  "peer relative h-14 w-[350px] md:w-[750px] rounded border border-slate-300 px-4 text-sm text-slate-600 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-slate-600 focus:border-[#ff0000] focus:outline-none focus:shadow-md focus:shadow-red-100";

const textareaClass =
  "peer relative h-48 w-[350px] md:w-[750px] rounded border border-slate-300 px-4 pt-2 text-sm text-slate-600 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none focus:shadow-md focus:shadow-red-100";
export default Feedback;
