/**
 * This component renders a table that list all assets of the website for seo with pagination.
 *
 * @param {}
 * @returns {ReactNode} A React element that renders a table of all assets.
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
import { FaCirclePlus } from "react-icons/fa6";

import TableBody from "./manageAssetComponents/TableBody";
import FiterByNumPagination from "../SuperAdmin/manageUsersComponents/FilterByNumPagination";
import TableHead from "./manageAssetComponents/TableHead";
import SearchFieldForAuthorized from "../../../components/SearchFieldForAuthorized/SearchFieldForAuthorized";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageAsset = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(10);
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const deleteAsset = (id) => {
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
            `/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/${id}`
          )
          .then((res) => {
            if (res.data.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Asset has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  // pagination handlers
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

  // function to search user in the database
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchTerm = form.get("searchTerm");
    setSearchTerm(searchTerm);
  };

  // fetch all user data from database
  const {
    data: allAsset = [],
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "manageAssets", searchTerm, currentPage, pageLimit],
    queryFn: async () => {
      let url = "";
      if (searchTerm) {
        url = `/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/f82b713907270eab5855d595ef189a606b38eb900c9e2090ff7122f0609a207f?searchTerm=${searchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        url = `/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50/f82b713907270eab5855d595ef189a606b38eb900c9e2090ff7122f0609a207f?page=${currentPage}&limit=${pageLimit}`;
      }
      const res = await axiosSecure.get(url);
      return res?.data;
    },
    staleTime: 1000,
  });

  // click on search clear button beside search field
  const refreshHandler = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setLimit(10);
  };

  // show loading icon when fetching data
  if (isLoading || isPending) return <Loading isLoading={true} />;

  return (
    <div className=" space-y-6 mt-20">
      {/* add dynamic name and tags */}
      <Helmet>
        <title>Manage Asset</title>
        <meta name="description" content="Manage the asset" />
      </Helmet>

      {/* Page Heading  */}
      <H2Title baseText={"Manage"} coloredText={"Assets"}></H2Title>

      {/* search input with refresh button  */}
      <div className=" flex justify-end items-center gap-2">
        {/* render refresh button if there search term  */}
        {/* render button clears search term  */}
        {searchTerm && (
          <button
            onClick={refreshHandler}
            className="text-red-500 text-xl px-4 border h-full py-2 rounded-md cursor-pointer"
          >
            <FiRefreshCcw />
          </button>
        )}

        {/* find any assets using search input  */}
        <SearchFieldForAuthorized
          onSubmitHandler={onSubmitHandler}
          searchTerm={searchTerm}
        ></SearchFieldForAuthorized>

        {/* link to add asset form  */}
        <Link
          to="/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/d791983f9dc8463919cf05a97141b0cab0fd89d70c78e24ed75079454052c7bf"
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
            allAsset={allAsset}
            refetch={refetch}
            navigate={navigate}
            deleteAsset={deleteAsset}
          />
        </table>
      </div>

      {/* pagination 1, 2, 3  */}
      <div className=" pb-20 ">
        <div className=" flex justify-between items-center h-16 mt-2 rounded-md ">
          <Pagination
            color="error"
            count={calculateNumberOfPages(
              allAsset?.meta?.total,
              allAsset?.meta?.limit
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

export default ManageAsset;
