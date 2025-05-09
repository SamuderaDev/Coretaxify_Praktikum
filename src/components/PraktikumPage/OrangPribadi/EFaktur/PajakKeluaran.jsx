import React, { useState, useRef } from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router";
import PajakKeluaranBadan from "../../Badan/EFaktur/PajakKeluaran";
import { useUserType } from "@/components/context/userTypeContext";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useQuery } from "@tanstack/react-query";
import { getCookieToken } from "@/service";
// import { default as PajakKeluaranBadan } from "../../Badan/EFaktur/PajakKeluaran";

const PajakKeluaran = ({
  data,
  sidebar,
  pagination,
  onPageChange,
  currentPage = 1,
}) => {
  const { id, akun } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const token = getCookieToken();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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

  if (isLoadingCompanies) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900">
          AAAAA
        </div>
      </div>
    );
  }

  if (representedCompanies.data.length > 0) {
    return (
      <PajakKeluaranBadan
        data={data}
        sidebar={sidebar}
        pagination={pagination}
        onPageChange={onPageChange}
        currentPage={currentPage}
      ></PajakKeluaranBadan>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarEFaktur
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />

      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Pajak Keluaran
            </h1>
          </div>
        </div>
        <div className="flex justify-between mb-4 border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="flex  text-left text-sm" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded"
              >
                Import <FaChevronDown className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      href="/template-import-pajak-keluaran.xlsx"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download Template
                    </a>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Import Dokumen
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* <button
              className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm"
              onClick={() =>
                (window.location.href =
                  "/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran")
              }
            >
              Tambah
            </button> */}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm">
              Upload Faktur
            </button>
            <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm">
              Hapus Dokumen
            </button>
          </div>
        </div>

        <div className="w-auto overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto border border-gray-300 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 border">No</th>
                <th className="px-8 py-2 border">Checklist</th>
                <th className="px-4 py-2 border">Aksi</th>
                <th className="px-4 py-2 border">NPWP Pembeli</th>
                <th className="px-4 py-2 border">Nama Pembeli</th>
                <th className="px-4 py-2 border">Kode Transaksi</th>
                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                <th className="px-4 py-2 border">Masa Pajak</th>
                <th className="px-4 py-2 border">Tahun</th>
                <th className="px-4 py-2 border">Masa Pajak Pengkreditan</th>
                <th className="px-4 py-2 border">Tahun Pajak Pengkreditan</th>
                <th className="px-4 py-2 border">Status Faktur</th>
                <th className="px-4 py-2 border">Harga Jual/Pengganti/DPP</th>
                <th className="px-4 py-2 border">DPP Nilai Lain / DPP</th>
                <th className="px-4 py-2 border">PPN</th>
                <th className="px-4 py-2 border">PPnBM</th>
                <th className="px-4 py-2 border">Perekam (Pengirim faktur)</th>
                <th className="px-4 py-2 border">Nomor SP2D</th>
                <th className="px-4 py-2 border">Valid</th>
                <th className="px-4 py-2 border">Dilaporkan</th>
                <th className="px-4 py-2 border">Dilaporkan Oleh Penjual</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td colSpan="10" className="text-center p-4 border">
                  Belum ada data
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PajakKeluaran;
