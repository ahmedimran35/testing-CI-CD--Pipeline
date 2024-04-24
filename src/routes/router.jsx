/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import SeoRoutes from "./SeoRoutes";

import Loading from "../components/isLoading/Loading";
import ManageSoftwareAndTools from "../pages/Dashboard/Seo/ManageSoftware";
import UpdateSoftwareAndTools from "../pages/Dashboard/Seo/UpdateSoftware";
import FetchingToolsAndSoftwareCategory from "../pages/Category/FetchingCategory/FatchingToolsAndSoftwareCategory";
import SingleSoftwareAndTools from "../pages/Category/FetchingCategoryData/SingleSoftwareAndTools";
import Feedback from "../components/Footer/More/Feedback/Feedback";
import AddImportantPages from "../pages/Dashboard/Seo/ImportantPages/AddImportantPages";
import ManageImportantPages from "../pages/Dashboard/Seo/ImportantPages/ManageImportantPages";
import UpdateImportantPage from "../pages/Dashboard/Seo/ImportantPages/UpdateImportantPage";
import ImportantPage from "../components/Footer/Import/ImportantPages/ImportantPage";
import AdminFeedback from "../pages/Dashboard/SuperAdmin/AdminFeedback/AdminFeedback";
import AboutUsPage from "../pages/Dashboard/Seo/ImportantPages/AboutUsPage";
import SignInPage from "../pages/AuthPage/SignInPage";

const Analytics = lazy(() => import("../pages/Dashboard/SuperAdmin/Analytics"));
const CategorySingleAsset = lazy(() =>
  import("../pages/Category/FetchingCategoryData/CategorySingleAsset")
);
const FetchingCategory = lazy(() =>
  import("../pages/Category/FetchingCategory/FetchingCategory")
);
const DashboardLayoutV2 = lazy(() =>
  import("../Layout/DashboardLayout/DashboardLayoutV2")
);
const HomePage = lazy(() => import("./../pages/HomePage/HomePage"));
const Donation = lazy(() => import("./../pages/Donation/Donation"));
const DonationSuccess = lazy(() =>
  import("../pages/DonationSuccess/DonationSuccess")
);
const PaymentPage = lazy(() => import("../pages/Donation/checkout/Payment"));
const AddAsset = lazy(() => import("../pages/Dashboard/Seo/AddAsset"));
const ManageAsset = lazy(() => import("../pages/Dashboard/Seo/ManageAsset"));
const UpdateAsset = lazy(() => import("../pages/Dashboard/Seo/UpdateAsset"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));
const ManageUser = lazy(() =>
  import("../pages/Dashboard/SuperAdmin/ManageUser")
);
const AddSoftwares = lazy(() => import("../pages/Dashboard/Seo/AddSoftwares"));
const Category = lazy(() => import("../pages/Category/Category"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <HomePage />
          </Suspense>
        ),
      },

      {
        path: "/donate",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Donation />
          </Suspense>
        ),
      },

      {
        path: "/payment",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PaymentPage />
          </Suspense>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <DonationSuccess />
          </Suspense>
        ),
      },
      {
        path: "/category-data/:titleId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <CategorySingleAsset />
          </Suspense>
        ),
      },
      {
        path: "/software-and-tools-data/:titleId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SingleSoftwareAndTools />
          </Suspense>
        ),
      },
      // footer important section
      {
        path: "/:pageName",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <ImportantPage />
          </Suspense>
        ),
      },

      // footer more section

      {
        path: "/about-us",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <AboutUsPage />
          </Suspense>
        ),
      },
      {
        path: "/59bda3f8ee98128d543572e0d29f27ad5343f0c88c36e7bf4672c4c3ab6245b4",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Feedback />
          </Suspense>
        ),
      },
    ],
  },

  // category section
  {
    path: "/category-data",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <Category />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <FetchingCategory />
          </Suspense>
        ),
      },
    ],
  },

  // category section tools and software section
  {
    path: "/category-tools-and-software",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <Category />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <FetchingToolsAndSoftwareCategory />
          </Suspense>
        ),
      },
    ],
  },

  // Dashboard
  {
    path: "/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <PrivateRoutes>
          <DashboardLayoutV2 />
        </PrivateRoutes>
      </Suspense>
    ),
    children: [
      // admin dashboard
      {
        // see list of all user
        path: "17e21e87cd28d0fae82e2ea454787ccd2b48ff664d515f15013833655881358b",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PrivateRoutes>
              <AdminRoutes>
                <ManageUser />
              </AdminRoutes>
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        // see all data of website
        path: "35ea33bcec36ccce8bdb472f803c4fc0d0eaae9d4c51181e5000a9eff322179b",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PrivateRoutes>
              <AdminRoutes>
                <Analytics />
              </AdminRoutes>
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        // admin feedback route
        path: "906673d45758e5d8964febf9865fadea13302b0cb65a8a21875edcd2a60b16f9",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PrivateRoutes>
              <AdminRoutes>
                <AdminFeedback />
              </AdminRoutes>
            </PrivateRoutes>
          </Suspense>
        ),
      },

      // seo dashboard
      {
        path: "d791983f9dc8463919cf05a97141b0cab0fd89d70c78e24ed75079454052c7bf",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <AddAsset />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "f6115fc57e3bf87006d8f14cd0422795d5559f13bd4f7e7e01a93554df7b7b90",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <AddSoftwares />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "42439c1a1b7c8aa202928936a3166617c580039f6c99e745405e92c9cb54fdfa",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <ManageSoftwareAndTools />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        // manage important pages
        path: "dd6c71448dfe05bfa1c2bbd71cab1db5cdc1292615133c8adb6d988e2bc138d4",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <ManageImportantPages />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        // update important pages
        path: "88c60f426f5387f8fb84bf04132ef7aec5ff8843a2dc7de2d83fa968c7826133/:id",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <UpdateImportantPage />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "46bade64727b5046da39635eea8448e552d31d9009829b919ffc96e65847fc88",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <ManageAsset />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        // add important pages
        path: "fdb09fcb2ff7873267912c749d4334be303826eac022c9ee5140a49f7c41d5a6",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <AddImportantPages />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "e0786eb19d491474c19552fb6fd4a14438a8600fa21f1e94f27a71d9f20e2b40/:assetId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <UpdateAsset />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "b38ee85103fa171859bc716a20d777958df408f41364a0f444ea739cb7057d1f/:toolsId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <UpdateSoftwareAndTools />
            </SeoRoutes>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <SignInPage />
      </Suspense>
    ),
  },
]);

export default router;
