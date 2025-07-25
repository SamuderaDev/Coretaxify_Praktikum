import React, { useState } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import Header from "@/components/Header/Header";

// Import our shared components
import BUPOTLayout from "./shared/BUPOTLayout";

const BUPOTRenderer = ({
  type,
  BelumTerbit,
  TelahTerbit,
  TidakValid,
  apiEndpoint,
  queryKey,
  titles = {},
  data = null, // For when data is passed from RoleBasedRenderer
  sidebar
}) => {
  const { id, akun, status } = useParams();
  const [cookies] = useCookies(["token"]);
  const location = useLocation();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const getBupot = () => {
    const pathSegments = location.pathname.split("/");
    const bupotType = pathSegments.find((segment) =>
      [
        "bppu",
        "bpnr",
        "ps",
        "psd",
        "bp21",
        "bp26",
        "bpa1",
        "bpa2",
        "bpbpt",
        "dsbp",
      ].includes(segment)
    );

    switch (bupotType) {
      case "bppu":
        return "BPPU";
      case "bpnr":
        return "BPNR";
      case "ps":
        return "Penyetoran Sendiri";
      case "psd":
        return "Pemotongan Secara Digunggung";
      case "bp21":
        return "BP 21";
      case "bp26":
        return "BP 26";
      case "bpa1":
        return "BP A1";
      case "bpa2":
        return "BP A2";
      case "bpbpt":
        return "Bukti Pemotongan Bulanan Pegawai Tetap";
      default:
        return "DSBP";
    }
  };

  const getPembuat = () => {
    const viewParam = searchParams.get("viewAs");
    if (viewParam) {
      return viewParam;
    }
    return akun;
  };

  const currentBupot = getBupot();
  const currentPembuat = getPembuat();

  console.log("Current BUPOT:", currentBupot);
  console.log("Current Pembuat:", currentPembuat);

  // Determine which status we're viewing
  const getStatus = () => {
    if (location.pathname.includes("/telah-terbit")) return "published";
    if (location.pathname.includes("/tidak-valid")) return "invalid";
    return "draft";
  };

  const currentStatus = getStatus();

  // Only fetch data if it wasn't provided via props (from RoleBasedRenderer)
  const {
    data: fetchedData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [queryKey || `bupot-${type}`, id, akun, currentStatus, currentPage],
    queryFn: async () => {
      const url = `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          intent: `api.bupot.${type}`,
          column_filters: {
            status_penerbitan: currentStatus,
            tipe_bupot: currentBupot,
            pembuat_id: currentPembuat
          },
          page: currentPage,
        },
      });
      console.log("BUPOT Response:", data);
      return data;
    },
    // Skip the query if data is provided directly
    // enabled: !data,
  });

  // Use provided data or fetched data
  const bupotData = fetchedData;

  // Function to refresh data after actions
  const handleDataRefresh = () => {
    refetch();
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading && !fetchedData) {
    return (
      <>
        {/* <Header /> */}
        <div className="loading flex items-center justify-center h-screen">
          <ClipLoader color="#7502B5" size={50} />
          <p className="ml-3">Loading data...</p>
        </div>
      </>
    );
  }

  if (error && !fetchedData) {
    return (
      <>
        {/* <Header /> */}
        <div className="error-container p-5 text-center">
          <h1 className="text-red-600 text-xl">Error</h1>
          <p>{error.message || "Error loading data"}</p>
        </div>
      </>
    );
  }

  // Determine which component to render based on status
  const renderContent = () => {
    switch (currentStatus) {
      case "published":
        return TelahTerbit ? (
          <TelahTerbit data={bupotData?.data || []} />
        ) : (
          <BUPOTLayout
            type={type}
            status={currentStatus}
            data={bupotData?.data || []}
            pagination={bupotData?.meta}
            links={bupotData?.links}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            tableTitle={
              titles.published || `EBUPOT ${type.toUpperCase()} ISSUED`
            }
            sidebarTitle={titles.sidebar || type.toUpperCase()}
            onDataRefresh={handleDataRefresh}
            sidebar={sidebar}
            statusPenerbitan={currentStatus}
            tipeBupot={currentBupot}
            sistemId={currentPembuat}
          />
        );
      case "invalid":
        return TidakValid ? (
          <TidakValid data={bupotData?.data || []} />
        ) : (
          <BUPOTLayout
            type={type}
            status={currentStatus}
            data={bupotData?.data || []}
            pagination={bupotData?.meta}
            links={bupotData?.links}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            tableTitle={
              titles.invalid || `EBUPOT ${type.toUpperCase()} INVALID`
            }
            sidebarTitle={titles.sidebar || type.toUpperCase()}
            onDataRefresh={handleDataRefresh}
            sidebar={sidebar}
            statusPenerbitan={currentStatus}
            tipeBupot={currentBupot}
            sistemId={currentPembuat}
          />
        );
      default:
        return BelumTerbit ? (
          <BelumTerbit data={bupotData?.data || []} />
        ) : (
          <BUPOTLayout
            type={type}
            status={currentStatus}
            data={bupotData?.data || []}
            pagination={bupotData?.meta}
            links={bupotData?.links}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            tableTitle={
              titles.belumTerbit || `EBUPOT ${type.toUpperCase()} NOT ISSUED`
            }
            sidebarTitle={titles.sidebar || type.toUpperCase()}
            onDataRefresh={handleDataRefresh}
            sidebar={sidebar}
            statusPenerbitan={currentStatus}
            tipeBupot={currentBupot}
            sistemId={currentPembuat}
          />
        );
    }
  };

  return (
    <>
      {/* <Header /> */}
      {renderContent()}
    </>
  );
};

export default BUPOTRenderer;
