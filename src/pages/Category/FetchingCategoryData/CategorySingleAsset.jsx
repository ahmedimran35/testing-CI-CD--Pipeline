import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../components/isLoading/Loading";
import { Helmet } from "react-helmet-async";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import SignInButton from "../../../components/buttons/SignInButton/SignInButton";
import SmallLoading from "../../../components/isLoading/SmallLoading";
import ScrollToTop from "../../../components/ScrollToTheTop/ScrollToTheTop";

const CategorySingleAsset = () => {
  const { titleId } = useParams();
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const splittedSlug = titleId?.split("-");
  const [fileName, setFileName] = useState("");

  const { user, loading: userLoading } = useAuth();
  const assetId = splittedSlug[splittedSlug.length - 1];
  const {
    data: assetDetail = {},
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [titleId, "assetDetail"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/details-check-by-user/${assetId}`
      );
      return res?.data?.data;
    },
    staleTime: 10000, // Refetch data after 1 minute of inactivity
  });

  const downloadHandler = async (publicId, assetId, originalFileName) => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_axiosPublic}/68ff63fb82e0e5dfec2a8496bf9afef608ad639ed552e740268eb537fa52067f`,
        {
          assets: assetId,
          userEmail: user?.email,
        }
      );

      if (result?.status == 200) {
        const response = await axios.get(
          `${
            import.meta.env.VITE_axiosPublic
          }/68ff63fb82e0e5dfec2a8496bf9afef608ad639ed552e740268eb537fa52067f/5177af177df52fb9b029f1df6310d5bbaf6333fbb7fdf9c788342a52b56d14d9/${publicId}`,
          {
            responseType: "blob",
          }
        );

        // Extract filename from content-disposition header if it exists
        const contentDisposition = response.headers["content-disposition"];
        const filenameMatch = contentDisposition
          ? contentDisposition.match(/filename="(.+)"/)
          : null;
        let filename = filenameMatch ? filenameMatch[1] : originalFileName;

        // Extract file extension from content-type header
        const contentType = response.headers["content-type"];
        const fileExtensionMatch = contentType
          ? contentType.match(/\/([a-zA-Z0-9]+)$/)
          : null;

        const fileExtension = fileExtensionMatch
          ? fileExtensionMatch[1]
          : "ext";

        // Combine filename and file extension
        filename += `.${fileExtension}`;
        setFileName(filename);

        // Create a temporary URL for the image blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a temporary <a> element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: `${error?.response?.data?.message}.`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000",
      });
    }
  };

  if (isLoading || isPending) return <Loading isLoading={true} />;

  const objectTags = Object?.keys(assetDetail?.tags || {});
  const tags = objectTags?.map((tag) => tag);

  return (
    <main className="max-w-7xl mx-auto min-h-fit ">
      <Helmet>
        <title>{assetDetail?.metaTitle}</title>
        <meta name="description" content={assetDetail?.metaDescription} />
      </Helmet>
      <ScrollToTop />
      <div
        className={`flex  ${
          assetDetail?.category === "icon"
            ? "flex-col md:items-center  lg:flex-row"
            : "flex-col md:flex-row"
        } items-center lg:items-start md:items-start  justify-center gap-4 lg:gap-8 my-10 mx-2 `}
      >
        <div
          className={` ${
            assetDetail?.category === "icon"
              ? "w-[250px] md:w-fit"
              : "w-[80%] md:w-[1200px]"
          } `}
        >
          <img
            className={` ${
              assetDetail?.category === "icon"
                ? "w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[480px] lg:h-[480px]"
                : "w-full lg:w-[920px] h-full lg:h-[517.5px] "
            } rounded-md selector object-center`}
            src={assetDetail?.url}
            alt={assetDetail?.alternativeText}
            draggable={false}
          />
        </div>
        <div
          className={` ${
            assetDetail?.category === "icon"
              ? "w-[250px] md:w-[350px] h-fit border px-4 py-2 md:py-7"
              : "w-[80%] md:w-[400px] h-fit border px-4 py-2 md:py-7 "
          } rounded-md sticky top-2 space-y-2 `}
        >
          <h3 className="text-lg md:text-xl lg:text-3xl font-semibold">
            {assetDetail?.title}
          </h3>
          <h3 className="text-xs lg:text-sm">{assetDetail?.description}</h3>
          <div className="flex gap-2 pb-3">
            {Object.values(assetDetail?.tags)?.map((tag) => (
              <p
                key={tag}
                className="bg-gray-200 px-1 py-[2px] rounded-md text-xs"
              >
                {tag}
              </p>
            ))}
          </div>

          {/* {userLoading? "Loading": "Done"} */}
          {userLoading ? (
            <SmallLoading />
          ) : user?.email ? (
            <div className="flex flex-row gap-2 mt-5">
              <button
                onClick={() =>
                  downloadHandler(
                    assetDetail?.public_id,
                    assetDetail?._id,
                    assetDetail?.title
                  )
                }
                disabled={loading}
                className="inline-flex items-center justify-center px-2 py-1 md:px-4 md:py-[10px] text-xs md:text-[12px] lg:text-[15px] font-medium tracking-wide text-white border hover:border-[#ff0000] hover:text-[#ff0000] transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-white hover:shadow-2xl uppercase hover:cursor-pointer"
              >
                {loading ? "Downloading...." : "Download"}
              </button>

              <Link to={`/donate`}>
                <button className="inline-flex items-center justify-center px-2 py-1 md:px-4 md:py-[10px] text-xs md:text-[12px] lg:text-[15px] font-medium tracking-wide text-[#ff0000] hover:text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap border border-[#ff0000] bg-white hover:bg-[#ff0000] hover:shadow-2xl uppercase hover:cursor-pointer">
                  Donate
                </button>
              </Link>
            </div>
          ) : (
            <div className=" p-2 border border-[#ff0000] rounded-md shadow shadow-[#ff0000]  space-y-3">
              <h4 className=" text-center font-semibold text-[#ff0000]">
                Sign-in required
              </h4>
              <p className="text-sm">
                Think this icon is perfect? Sign up for an account to download
                it - it&apos;s super easy!
              </p>
              <div className=" text-center" data-test="signInSmall">
                <SignInButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategorySingleAsset;
