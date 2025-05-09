import React, { useEffect, useState } from "react";
import {
  Bell,
  UserCircle,
  ChevronDown,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Logo from "../../assets/images/5.png";
import { useUserType } from "../context/userTypeContext";
import { useParams } from "react-router";
import { RoutesApi } from "@/Routes";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookieToken } from "@/service";
import { ClipLoader } from "react-spinners";
import { useCookies } from "react-cookie";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Header = () => {
  // == Query ==
  const { id, akun } = useParams();
  // console.log(akun);
  //   const getAccountPortal = () =>
  // console.log(getCookieToken());
  const token = getCookieToken();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const logout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("role", { path: "/" });
    window.location.href = "/login";
  };

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["getaccount", id],
    queryFn: async () => {
      const response = await axios.get(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            // intent: "api.get.sistem.first.account",
          },
        }
      );

      // Check if response data exists
      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data;
    },
    enabled: !!id && !!token,
  });

  const {
    data: representedCompanies,
    isLoading: isLoadingCompanies,
    isError: isErrorCompanies,
    error: errorCompanies,
    refetch: refetchCompanies,
  } = useQuery({
    queryKey: ["representedCompanies", id, akun],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/represented-companies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Return the data if it exists
        return response.data || [];
      } catch (error) {
        // For bad requests or any other errors, return an empty array
        console.error("Error fetching represented companies:", error.message);
        return [];
      }
    },
    enabled: !!id && !!akun && !!token,
  });

  // useEffect(() => {
  //   // console.log("Data:", data);

  //   setUserType(data[0].id);
  // }, [data]);
  //   getAccountPortal();

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subDropdownOpen, setSubDropdownOpen] = useState(null);
  const { userType, setUserType } = useUserType();
  //   alert(id)

  console.log("User Type Context (Saat Render):", userType);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const toggleSubDropdown = (submenu) => {
    setSubDropdownOpen(subDropdownOpen === submenu ? null : submenu);
  };

  const navigateTo = (path) => {
    // alert("clicked");
    // window.location.href = `/praktikum/${id}/sistem/${path}/profil-saya `;
    // window.location.href = path;
    const pathParts = path.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    // Construct the new path with the base path and the last part
    const newPath = `/praktikum/${id}/sistem/${akun}/${lastPart}`;

    // Navigate to the new path
    window.location.href = newPath;
  };
  //   if (getAccountPortal().isLoading) {
  if (isLoading) {
    return (
      <div className="loading h-screen">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }
  if (isLoadingCompanies) {
    return (
      <div className="loading h-screen">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="error-container">
        <p>Error loading data: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-purple-700 text-white rounded-md mt-2"
        >
          Try Again
        </button>
      </div>
    );
  }
  // if (isErrorCompanies) {
  //   return (
  //     <div className="loading h-screen">
  //       <ClipLoader color="#7502B5" size={50} />
  //     </div>
  //   );
  // }
  console.log(RoutesApi.apiUrl + "student/assignments/" + id + "/sistem");
  console.log(representedCompanies);

  // const acc = data.find((item) => item.id == akun);
  // console.log(acc);
  return (
    <div className="w-full">
      <header className="bg-slate-100 text-blue-900 flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 py-3 shadow-md w-full overflow-x-auto">
        <div className="flex items-center space-x-4 -mx-14">
          <img src={Logo} alt="DJP Logo" className="h-10" />
          <h1 className="text-lg font-bold">CORETAXIFY</h1>
        </div>
        <div className="flex items-center space-x-6 mr-1">
          <FileText className="w-6 h-6 cursor-pointer" />
          <Bell className="w-6 h-6 cursor-pointer" />
          {representedCompanies &&
            representedCompanies.data &&
            representedCompanies.data.length > 0 && (
              <div className="flex items-center space-x-2 cursor-pointer ">
                <button
                  className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-md shadow-md"
                  onClick={() =>
                    setIsCompanyDropdownOpen(!isCompanyDropdownOpen)
                  }
                >
                  <FileText className="w-6 h-6" />
                  <span className="hidden md:inline">
                    {localStorage.getItem("selectedCompanyName") ||
                      "Perusahaan Terwakili"}
                  </span>
                  <ChevronDown className="w-5 h-5" />
                </button>

                {/* Dropdown menu for represented companies */}
                {isCompanyDropdownOpen && (
                  <ul className="absolute right-96 top-14 mt-2 w-64 bg-white border rounded-md shadow-lg py-1 px-2  z-50">
                    {representedCompanies.data.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            // Store company information in localStorage
                            localStorage.setItem(
                              "selectedCompanyType",
                              item.tipe_akun
                            );
                            localStorage.setItem(
                              "selectedCompanyName",
                              item.nama_akun
                            );
                            localStorage.setItem("selectedCompanyId", item.id);

                            console.log(
                              "User Type Berubah ke:",
                              item.nama_akun
                            );
                            setIsCompanyDropdownOpen(false);
                          }}
                        >
                          {item.nama_akun}
                        </li>
                      );
                    })}

                    <a href={`/praktikum/${id}/sistem/${akun}/profil-saya`}>
                      <li
                        onClick={() => {
                          // alert("mamamia");
                          localStorage.removeItem("selectedCompanyType");
                          localStorage.removeItem("selectedCompanyId");
                          localStorage.removeItem("selectedCompanyName");
                        }}
                        className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
                      >
                        Pribadi
                      </li>
                    </a>
                  </ul>
                )}
              </div>
            )}

          <div className="flex items-center space-x-2 cursor-pointer">
            <button
              className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-md shadow-md relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <UserCircle className="w-8 h-8" />
              <span className="hidden md:inline">
                {(data && data.find((item) => item.id == akun)?.nama_akun) ||
                  "Pilih Akun Terlebih Dahulu"}
              </span>
              <ChevronDown className="w-5 h-5" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <ul className="absolute right-14 top-14 mt-2 w-64 bg-white border rounded-md shadow-lg py-1 px-2">
                {data.map((item) => {
                  return (
                    <a href={`/praktikum/${id}/sistem/${item.id}/profil-saya`}>
                      <li
                        key={item.id}
                        className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          // setUserType(item.id);
                          console.log("User Type Berubah ke:", item.nama_akun);
                          setIsDropdownOpen(false);
                          // navigateTo(`profil-saya`);
                        }}
                      >
                        {item.nama_akun}
                      </li>
                    </a>
                  );
                })}
                {/* <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setUserType("Orang Pribadi");

                    console.log("User Type Berubah ke:", "Orang Pribadi");
                    setIsDropdownOpen(false);
                    window.location.href = "/admin/praktikum/1/prak1";
                  }}
                >
                  Orang Pribadi
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setUserType("Badan");
                    console.log("User Type Berubah ke:", "Badan");
                    setIsDropdownOpen(false);
                    window.location.href = "/admin/praktikum/2/prak1";
                  }}
                >
                  Badan
                </li> */}
              </ul>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger>
              <LogOut className="w-6 h-6 cursor-pointer text-red-600 font-bold" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah anda yakin ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Setelah anda logout, anda akan kembali ke halaman login.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Kembali</AlertDialogCancel>
                <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <div className="w-full bg-purple-700 pt-1">
        <nav className="w-full bg-purple-700 pb-2 px-4">
          <ul className="flex space-x-6 text-white">
            {[
              {
                label: "Portal Saya",
                submenu: [
                  "Dokumen Saya",
                  "Notifikasi Saya",
                  "Kasus Saya",
                  "Kasus Berjalan Saya",
                  {
                    label: "Profil Saya",
                    links: `/praktikum/${id}/sistem/${akun}/profil-saya`,
                  },
                  "Pengukuhan PKP",
                  "Pendaftaran Objek Pajak PBB P5L",
                  {
                    label: "Perubahan Data",
                    submenu: [
                      "Perubahan Data",
                      "Pengukuhan PKP",
                      "Pendaftaran Objek Pajak PBB P5L",
                    ],
                  },
                  {
                    label: "Perubahan Status",
                    submenu: [
                      "Penetapan Wajib Pajak Nonaktif",
                      "Pengaktifan Kembali Wajib Pajak Nonaktif",
                      "Penunjuk Pemungut PMSE Dalam Negeri",
                      "Penetapan Pemungut Bea Materai",
                      "Pencabutan Pemungut Bea Materai",
                      "Penunjukan Pemotong atau Pemungut PPh/PPN",
                      "Pencabutan Pemotong atau Pemungut PPh/PPN",
                      "Pencabutan Pemungut PPN PMSE",
                      "Lembaga Keuangan Pelapor - Penetapan",
                      "Lembaga Keuangan Pelapor - Pencabutan",
                      "Lembaga Keuangan Pelapor - Perubahan Data",
                    ],
                  },
                  "Pengahpusan & Pencabutan",
                  "Profil Institusi Finansial",
                ],
              },
              {
                label: "E-Faktur",

                links: `e-faktur`,
                submenu: [],
              },
              {
                label: "e-Bupot",
                submenu: [
                  "BPPU",
                  "BPNR",
                  "Penyetoran Sendiri",
                  "Pemotongan Secara Digunggung",
                  "BP 21 - Bukti Pemotongan Selain Pegawai Tetap",
                  "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri",
                  "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir",
                  "BP A2 - Bukti Pemotongan A1 Masa Pajak Terakhir",
                  "Bukti Pemotongan Bulanan Pegawai Tetap",
                  "Unggah Dokumen Yang Dipersamakan dengan Bukti Pemotongan/Pemungutan",
                ],
              },
              {
                label: "Surat Pemberitahuan(SPT)",
                submenu: [
                  "Surat Pemberitahuan (SPT)",
                  "Pencatatan",
                  "Dasbor Kompensasi",
                  "Pengungkapan Ketidakbenaran SPT",
                ],
              },
              {
                label: "Pembayaran",
                submenu: [
                  "Permohonan Pemindahbukuan",
                  "Layanan Mandiri Kode Billing",
                  "Pembuatan Kode Billing atas Tagihan Pajak",
                  "Daftar Kode Billing Belum Dibayar",
                  "Formulir Restitusi Pajak",
                  "Permohonan Pemberian Imbalan Bunga",
                  "Permohonan PPh DTP atas Penghasilan PDAM",
                ],
              },
              { label: "Buku Besar", submenu: [] },
            ].map((item, index) => (
              <li key={index} className="relative">
                {item.submenu.length > 0 ? (
                  <button
                    className="px-4 py-2 flex items-center hover:bg-yellow-500 hover:text-white rounded-md"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label} <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 flex items-center hover:bg-yellow-500 hover:text-white rounded-md"
                    onClick={() => navigateTo(item.links)}
                  >
                    {item.label}
                  </button>
                )}
                {item.submenu.length > 0 && dropdownOpen === item.label && (
                  <ul className="absolute left-0 mt-3 min-w-max bg-blue-900 text-white shadow-md rounded-md">
                    {item.submenu.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        className="relative px-4 py-4 hover:bg-yellow-500 cursor-pointer whitespace-nowrap"
                      >
                        {typeof sub === "string" ? (
                          <button onClick={() => navigateTo(sub)}>{sub}</button>
                        ) : sub.links ? (
                          <a href={sub.links} className="block w-full">
                            <button className="w-full text-left">
                              {sub.label}
                            </button>
                          </a>
                        ) : (
                          <>
                            <button
                              className="flex items-center w-full"
                              onClick={() => toggleSubDropdown(sub.label)}
                            >
                              {sub.label}{" "}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                            {sub.submenu && subDropdownOpen === sub.label && (
                              <ul className="absolute left-full mx-1 top-0 mt-0 min-w-max bg-blue-900 text-white shadow-md rounded-md text-left">
                                {sub.submenu.map((nestedSub, nestedIndex) => (
                                  <li
                                    key={nestedIndex}
                                    className="px-4 py-2 hover:bg-yellow-500 cursor-pointer whitespace-nowrap"
                                  >
                                    <button
                                      onClick={() => navigateTo(nestedSub)}
                                    >
                                      {nestedSub}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
