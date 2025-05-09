import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { getCookieToken } from "@/service";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";

export default function RoleBasedRenderer({
  OrangPribadi,
  Badan,
  url,
  intent,
  query,
}) {
  const params = useParams();
  const [cookies] = useCookies(["user"]);
  const [currentPage, setCurrentPage] = useState(1);

  function fillPath(template, params) {
    return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      return params[key] !== undefined ? params[key] : `:${key}`;
    });
  }
  const path = fillPath(url, params);

  // First query - get user data
  const {
    data: userData,
    isLoading: userLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["account", params.id, params.akun],
    queryFn: async () => {
      const { data } = await axios.get(
        `${RoutesApi.apiUrl}student/assignments/${params.id}/sistem/${params.akun}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
          params: {
            intent: "api.get.sistem.ikhtisar.profil",
          },
        }
      );
      return data;
    },
  });

  // Second query - get specific data with pagination
  // Second query - get specific data with pagination
  const companyId = localStorage.getItem("selectedCompanyId");
  console.log("Path before processing:", path);
  console.log("Params.akun:", params.akun);
  console.log("Company ID from localStorage:", companyId);

  // Construct a completely new URL instead of trying to replace parts
  const baseUrl = path.split("/sistem/")[0]; // Get the part before /sistem/
  const endUrl = path.split("/sistem/")[1]?.split(params.akun)[1] || ""; // Get the part after the account ID

  const requestPath = companyId
    ? `${baseUrl}/sistem/${companyId}${endUrl}`
    : path;

  console.log("Constructed request path:", requestPath);

  const {
    data: contentData,
    isLoading: contentLoading,
    isError: contentError,
    error: contentErrorDetails,
  } = useQuery({
    queryKey: [
      query,
      params.id,
      params.akun,
      requestPath,
      currentPage,
      companyId,
    ],
    queryFn: async () => {
      const { data } = await axios.get(requestPath, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: intent,
          page: currentPage, // Add page parameter
        },
      });
      console.log("Response data:", data);
      return data;
    },
  });

  console.log(localStorage.getItem("selectedCompanyId"));

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Show loading state
  if (userLoading || contentLoading) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <ClipLoader color="#7502B5" size={50} />
        <p className="ml-3">Loading data...</p>
      </div>
    );
  }

  // Show error state
  if (isUserError || contentError) {
    const errorMessage = isUserError
      ? userError?.message || "Error loading user data"
      : contentErrorDetails?.message || "Error loading content data";

    return (
      <div className="error-container p-5 text-center">
        <h1 className="text-red-600 text-xl">Error</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  // Ensure data exists
  if (!userData?.data || !contentData?.data) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <ClipLoader color="#7502B5" size={50} />
        <p className="ml-3">Data not available</p>
      </div>
    );
  }

  // Determine which component to render based on account type
  const isOrangPribadi = userData.data.tipe_akun.includes("Orang Pribadi");

  return (
    <>
      <Header />
      {isOrangPribadi ? (
        <OrangPribadi
          data={contentData.data}
          sidebar={userData.data}
          pagination={contentData} // Pass the whole response for links
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ) : (
        <Badan
          data={contentData.data}
          sidebar={userData.data}
          pagination={contentData} // Pass the whole response for links
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
