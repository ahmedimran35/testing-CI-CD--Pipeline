/**
 * This component renders a table that list all software and tools of the website for seo with pagination.
 *
 * @param {}
 * @returns {ReactNode} A React element that renders a table of all software and tools.
 */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../components/isLoading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import H2Title from "../../../components/Titles/H2Title";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { FiRefreshCcw } from "react-icons/fi";
import { calculateNumberOfPages } from "../../../utils/calculatePagination";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchFieldForAuthorized from "../../../components/SearchFieldForAuthorized/SearchFieldForAuthorized";
import TableHead from "./ManageSoftwareToolsComponents/TableHead";
import TableBody from "./ManageSoftwareToolsComponents/TableBody";
import FiterByNumPagination from "../SuperAdmin/manageUsersComponents/FilterByNumPagination";
import { FaCirclePlus } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageSoftwareAndTools = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(10);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const deleteSoftwareAndToolsHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#B2BEB5",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(
            `/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee/${id}`
          )
          .then((res) => {
            if (res.data.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Software and Tools has been deleted.",
                icon: "success",
              });
            }
            refetch();
          });
      }
    });
  };

  // pagination functions
  const handleChange = (event) => {
    setLimit(event.target.value);
    setCurrentPage(1);
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // scroll to the top when changing filter for pagination, or change page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageLimit, currentPage]);

  // search function
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchTerm = form.get("searchTerm");
    setSearchTerm(searchTerm);
  };

  // fetch all software and tools data from database
  const {
    data: allSoftwareAndTools = [],
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [
      user?.email,
      "manageSoftwareAndTools",
      searchTerm,
      currentPage,
      pageLimit,
    ],
    queryFn: async () => {
      let url = "";
      if (searchTerm) {
        url = `/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee?searchTerm=${searchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        url = `/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee?page=${currentPage}&limit=${pageLimit}`;
      }
      const res = await axiosPublic.get(url);

      return res?.data?.data;
    },
  });

  // show loading icon when fetching data
  if (isLoading || isPending) return <Loading isLoading={true} />;

  const refreshHandler = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setLimit(10);
  };

  return (
    <div className=" space-y-6 mt-20">
      {/* add dynamic name and description for seo friendliness */}
      <Helmet>
        <title>Manage Software And Tools</title>
        <meta name="description" content="Manage Software And Tools" />
      </Helmet>
      {/* page heading  */}
      <H2Title baseText={"Manage"} coloredText={"Software And Tools"}></H2Title>
      {/* search input with refresh button  */}
      <div className=" flex justify-end items-center gap-2">
        {/* render refresh button if there search term  */}
        {/* render button clears search term  */}
        {searchTerm && (
          <div
            onClick={() => refreshHandler()}
            className="text-red-500 text-xl px-4 border h-full py-2 rounded-md cursor-pointer"
          >
            <FiRefreshCcw />
          </div>
        )}
        {/* find any assets using search input  */}
        <SearchFieldForAuthorized
          onSubmitHandler={onSubmitHandler}
          searchTerm={searchTerm}
        ></SearchFieldForAuthorized>

        {/* link to add software and tools form  */}
        <Link
          to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/f6115fc57e3bf87006d8f14cd0422795d5559f13bd4f7e7e01a93554df7b7b90"
          className="inline-flex items-center justify-center px-3 py-2 md:px-4 md:py-[10px] text-xs gap-1 md:text-[12px] lg:text-[15px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl uppercase hover:cursor-pointer"
        >
          Add <FaCirclePlus className="text-sm" />
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left border border-separate rounded-lg border-slate-200"
          cellSpacing="0"
        >
          {/* table head  */}
          <TableHead />
          {/* Table Body  */}
          <TableBody
            allSoftwareAndTools={allSoftwareAndTools}
            deleteSoftwareAndToolsHandler={deleteSoftwareAndToolsHandler}
            axiosPublic={axiosPublic}
            navigate={navigate}
          />
        </table>
      </div>

      {/* pagination 1, 2, 3  */}
      <div className=" pb-20 ">
        <div className=" flex    justify-between items-center h-16   mt-2  rounded-md ">
          <Pagination
            color="error"
            count={calculateNumberOfPages(
              allSoftwareAndTools?.meta?.total,
              allSoftwareAndTools?.meta?.limit
            )}
            onChange={handlePageChange}
            page={currentPage}
            variant="outlined"
            shape="rounded"
          />
          {/* filter: number of users shown in one page */}
          <FiterByNumPagination
            pageLimit={pageLimit}
            handleChange={handleChange}
          ></FiterByNumPagination>
        </div>
      </div>
    </div>
  );
};

export default ManageSoftwareAndTools;
