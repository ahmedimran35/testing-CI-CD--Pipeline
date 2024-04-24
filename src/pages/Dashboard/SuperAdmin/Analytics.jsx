import H2Title from "../../../components/Titles/H2Title";
import { FaDonate, FaDownload, FaTools } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoMdCloudDownload } from "react-icons/io";
import { LuFileStack } from "react-icons/lu";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/isLoading/Loading";
import useAuth from "../../../Hooks/useAuth";
import InfoCard from "./analyticsComponents/InfoCard";
import DonateCard from "./analyticsComponents/DonateCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Analytics = () => {
  // const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: analytics,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [user?.email, "manageAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/6710e49eebf184e7a309686224ecf6fd9a5228cee76e8e0ef4034684d683112f"
      );
      return res?.data.data;
    },
    staleTime: 60000, // Refetch data after 1 minute of inactivity
  });

  if (isLoading || isPending) return <Loading isLoading={true} />;

  const {
    donation,
    assetUpload,
    download,
    toolsAndSoftwareUpload,
    uniqueDownload,
    user: clients,
  } = analytics;

  return (
    <div className="space-y-10 my-16">
      <H2Title baseText={"Admin"} coloredText={"Dashboard"}></H2Title>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* donation  */}

        <div className="col-span-1 row-span-2 border-2 p-6 rounded-xl overflow-hidden text-center bg-white shadow-md hover:shadow-lg text-black shadow-slate-200 ">
          <div className="w-full h-full flex flex-col items-start justify-center gap-2 ">
            <div className="  flex justify-between w-full">
              <span className="tracking-tight text-xl font-medium text-zinc-600 ">
                Total Donations
              </span>
              <span className="h-full flex    justify-center   items-center  text-zinc-700">
                <FaDonate />
              </span>
            </div>
            <span className="text-5xl font-bold">${donation?.total}</span>
            <span className="text-sm text-zinc-600">
              <span className="text-[#ff0000]"> +{donation?.thisMonth}</span>{" "}
              earned this month
            </span>
          </div>
        </div>

        {/* total user  */}

        <InfoCard
          info={{
            name: "Total Users",
            number: clients?.total,
            monthly: clients?.thisMonth,
            icon: <FaUsers />,
            text: "added this month",
            prefix: "+",
          }}
        />
        {/* Unique Downloads  */}

        <div className="col-span-1 row-span-2 border-2 p-6 rounded-xl overflow-hidden text-center bg-white shadow-md hover:shadow-lg text-black shadow-slate-200 flex flex-row items-center justify-between">
          <div className="w-full h-full flex flex-col items-start justify-center gap-2 ">
            <div className=" flex w-full justify-between">
              <span className="tracking-tight text-xl font-medium  text-zinc-600">
                Unique Downloads
              </span>
              <div className="h-full flex justify-center items-start text-zinc-700">
                <FaDownload />
              </div>
            </div>
            <span className="text-5xl font-bold">+{uniqueDownload?.total}</span>
            <span className="text-sm text-zinc-600">
              <span className="text-[#ff0000]">
                {" "}
                +{uniqueDownload?.thisMonth}
              </span>{" "}
              downloaded this month
            </span>
          </div>
        </div>

        {/* Total Assets  */}

        <InfoCard
          info={{
            name: "Total Assets",
            number: assetUpload?.total,
            monthly: assetUpload?.thisMonth,
            icon: <LuFileStack />,
            text: "uploaded this month",
            prefix: "+",
          }}
        />

        {/* Total Downloads */}
        <InfoCard
          info={{
            name: "Total Downloads",
            number: download?.total,
            monthly: download?.thisMonth,
            icon: <IoMdCloudDownload />,
            text: "downloaded this month",
            prefix: "+",
          }}
        />

        {/* Tools and Softwares  */}
        <InfoCard
          info={{
            name: "Tools and Softwares",
            number: toolsAndSoftwareUpload?.total,
            monthly: toolsAndSoftwareUpload?.thisMonth,
            icon: <FaTools />,
            text: "added this month",
            prefix: "+",
          }}
        />

        {/* donation list  */}
        <div className="p-6 rounded-xl col-span-4  shadow-md border-[1px]">
          <h3 className="font-semibold leading-none tracking-tight text-2xl">
            Recent Donations
          </h3>
          <p className="text-zinc-600 mt-1 text-sm pb-4">
            You made ${donation?.today} in the last 24 hours
          </p>
          {donation?.donationList?.map((donation, i) => {
            const { amount, user, transactionId, paymentMethod } = donation;
            const { username, email } = user;
            const info = {
              username,
              email,
              amount,
              transactionId,
              paymentMethod,
            };
            return <DonateCard key={i} info={info}></DonateCard>;
          })}
        </div>

        {/* assets trending list  */}
        <div className="col-span-2 p-6 rounded-xl shadow-md border-[1px]">
          <h3 className="font-semibold leading-none tracking-tight text-2xl">
            Popular Assets
          </h3>
          <p className="text-zinc-600 mt-1 text-sm pb-4">
            Most popular assets of your website
          </p>
          <table className="table-auto w-full text-left whitespace-no-wrap ">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000] rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000]">
                  Category
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000]">
                  Views
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000] rounded-r">
                  Downloads
                </th>
              </tr>
            </thead>
            <tbody>
              {download?.trendingDownloadAsset.map((asset, i) => {
                return (
                  <tr key={i}>
                    <td className="px-4 py-3">{asset?.title}</td>
                    <td className="px-4 py-3">{asset?.category}</td>
                    <td className="px-4 py-3">{asset?.click}</td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      {asset?.download}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* tools and softwares trending list  */}
        <div className="col-span-2 p-6 rounded-xl shadow-md border-[1px]">
          <h3 className="font-semibold leading-none tracking-tight text-2xl">
            Popular Tools and Softwares
          </h3>
          <p className="text-zinc-600 mt-1 text-sm pb-4">
            Most popular tools and softwares of your website
          </p>
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000] rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000]">
                  Pricing
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000]">
                  Views
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-[#ff0000]  rounded-r">
                  Visited
                </th>
              </tr>
            </thead>
            <tbody>
              {toolsAndSoftwareUpload?.trendingToolsAndSoftware.map(
                (asset, i) => {
                  return (
                    <tr key={i}>
                      <td className="px-4 py-3">{asset?.title}</td>
                      <td className="px-4 py-3">{asset?.pricing}</td>
                      <td className="px-4 py-3">{asset?.click}</td>
                      <td className="px-4 py-3 text-lg text-gray-900">
                        {asset?.visited}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// const cardStyle = "overflow-hidden text-center bg-white rounded shadow-md text-black shadow-slate-200 hover:shadow-red-200"
export default Analytics;
