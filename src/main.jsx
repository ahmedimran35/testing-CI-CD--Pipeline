import React from "react";

import "./index.css";
import router from "./routes/router.jsx";
import AuthProviders from "./Providers/AuthProviders.jsx";
import CategoryProvider from "./Providers/CategoryProvider.jsx";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import ToolsAndSoftwareCategoryProvider from "./Providers/ToolsAndSoftwareProvider.jsx";
import ResponsivenessProvider from "./Providers/ResponsivenessProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <ResponsivenessProvider>
            <CategoryProvider>
              <ToolsAndSoftwareCategoryProvider>
                <RouterProvider router={router} />
              </ToolsAndSoftwareCategoryProvider>
            </CategoryProvider>
          </ResponsivenessProvider>
        </AuthProviders>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
