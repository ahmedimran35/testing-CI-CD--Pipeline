import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import parse from "html-react-parser";
import Loading from "../../../isLoading/Loading";
import ScrollToTop from "../../../ScrollToTheTop/ScrollToTheTop";
const ImportantPage = () => {
  const { pageName } = useParams();
  const axiosPublic = useAxiosPublic();
  const {
    data: pageDetails = {},
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [pageName, "pageDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `e51210ce250c2139111c7f61be481cc034f2b5c0fedbe3c5d8ff69949d04a936/content?pageName=${pageName}`
      );
      return res?.data?.data;
    },
    staleTime: 10000, // Refetch data after 1 minute of inactivity
  });
  const loadedBriefDescription = pageDetails?.content || "";
  if (isLoading || isPending) return <Loading isLoading={true} />;
  return (
    <div className="max-w-7xl mx-auto min-h-fit px-4  my-20">
      <ScrollToTop />
      <div className="blog-post">{parse(loadedBriefDescription)}</div>
    </div>
  );
};

export default ImportantPage;
