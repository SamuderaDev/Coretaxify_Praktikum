import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { getCookieToken } from "@/service";

const UserTypeContext = createContext();

// Create a query function to fetch represented companies
const fetchRepresentedCompanies = async ({ id, akun, token }) => {
  if (!id || !akun || !token) {
    return { data: [] };
  }

  try {
    const response = await axios.get(
      `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/represented-companies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle different response formats
    if (response.data && Array.isArray(response.data.data)) {
      return response.data;
    } else if (Array.isArray(response.data)) {
      return { data: response.data };
    } else {
      return { data: [] };
    }
  } catch (error) {
    console.error(
      "Error fetching represented companies in UserTypeContext:",
      error.message
    );
    return { data: [] };
  }
};

export const UserTypeProvider = ({ children }) => {
  // Existing userType logic
  const savedUserType = localStorage.getItem("userType") || "Orang Pribadi";
  const [userTypeState, setUserTypeState] = useState(savedUserType);

  const { id, akun } = useParams();
  const token = getCookieToken();

  // Use useQuery hook for fetching represented companies
  const {
    data: representedCompanies = { data: [] },
    isLoading: isLoadingRepresentedCompanies,
    error,
  } = useQuery({
    queryKey: ["representedCompanies", id, akun],
    queryFn: () => fetchRepresentedCompanies({ id, akun, token }),
    enabled: !!id && !!akun && !!token, // Only run the query if all these values exist
    staleTime: 5 * 60 * 1000, // 5 minutes - optional cache time
    refetchOnWindowFocus: false, // Optional: disable refetching when window regains focus
  });

  useEffect(() => {
    // This effect syncs userType to localStorage
    localStorage.setItem("userType", userTypeState);
  }, [userTypeState]);

  console.log("UserTypeContext Provider (userType):", userTypeState);
  console.log(
    "UserTypeContext Provider (representedCompanies):",
    representedCompanies
  );

  // Wrapper for setUserType to ensure localStorage is updated
  const setUserType = (newType) => {
    setUserTypeState(newType);
  };

  const hasRepresentedCompanies =
    !isLoadingRepresentedCompanies &&
    representedCompanies &&
    representedCompanies.data &&
    representedCompanies.data.length > 0;

  return (
    <UserTypeContext.Provider
      value={{
        userType: userTypeState,
        setUserType,
        representedCompanies,
        isLoadingRepresentedCompanies,
        hasRepresentedCompanies,
        error, // Also expose any error that occurred during fetching
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => useContext(UserTypeContext);
