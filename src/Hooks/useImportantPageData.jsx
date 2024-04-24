import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useImportantPageData = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allImportantPage = [],
    isTestLoading,
    isTestPending,
  } = useQuery({
    queryKey: ["important-page"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/e51210ce250c2139111c7f61be481cc034f2b5c0fedbe3c5d8ff69949d04a936`);
      return res?.data?.data;
    },
    staleTime: 10000, // Refetch data after 1 minute of inactivity
  });

  const informationPages = allImportantPage.filter(
    (page) => page.category == "Information"
  );
  const legalPages = allImportantPage.filter(
    (page) => page.category == "Legal"
  );
  const supportPages = allImportantPage.filter(
    (page) => page.category == "Support"
  );

  return {
    allImportantPage,
    isTestLoading,
    isTestPending,
    informationPages,
    legalPages,
    supportPages,
  };
};

export default useImportantPageData;
