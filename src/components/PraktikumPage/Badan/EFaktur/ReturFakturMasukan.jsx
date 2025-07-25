import React, { useState, useRef } from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaEdit, FaFilePdf, FaPlus } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useParams, useSearchParams } from "react-router";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import FakturPenilaian from "./FakturPenilaian";

const ReturFakturMasukan = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const userId = searchParams.get("user_id");
  const navigate = useNavigateWithParams();
  console.log("retur masukan :", data);
  const formatRupiah = (number) => {
    // If data is null, undefined, or empty string, change it to 0
    if (number === null || number === undefined || number === "") {
      number = 0;
    }

    // Convert to string first to handle both string and number inputs
    let stringValue = String(number);

    // Normalize "0.00" to "0"
    if (stringValue === "0.00") stringValue = "0";

    // Remove any non-numeric characters except decimal point and negative sign
    const cleanedValue = stringValue.replace(/[^0-9.-]/g, "");

    // Convert to number
    const numericValue = parseFloat(cleanedValue);

    // Check if conversion was successful, if not return "0"
    if (isNaN(numericValue)) return "0";

    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // This ensures no decimal places are shown
    }).format(numericValue);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarEFaktur
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <div className="flex-auto p-3 bg-white rounded-md h-full w-min-0">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Retur Pajak Masukan{" "}
            </h1>
          </div>
          {userId ? (
            <FakturPenilaian
              tipeFaktur="Retur Faktur Masukan"
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between mb-4 border-b pb-3">
          <div className="flex justify-between gap-2">
            {/* <Link
              to="/admin/praktikum/2/tambah-retur-faktur"
              className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded"
            >
              <FaPlus className="text-lg text-white mr-2" />
              Buat Retur
            </Link> */}
            <button
              onClick={() =>
                navigate(`/praktikum/${id}/sistem/${akun}/e-faktur/buat-retur`)
              }
              className={userId ? "hidden" : "flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded"}
            >
              Buat Retur
              <FaPlus className="text-lg text-white mr-2" />
            </button>
            <button className={userId ? "hidden" : "flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded"}>
              Import Data
              <FaChevronDown className="text-lg text-white ml-2" />
            </button>
          </div>
          <button className={userId ? "hidden" : "flex items-center bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-2 rounded"}>
            <TiDeleteOutline className="text-2xl text-white mr-2" />
            Batalkan Retur
          </button>
        </div>
        <div className="w-[1040px]   overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mx-4">
          <table className="table-auto border border-gray-300 overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-1 py-2">No</th>
                <th className="px-4 py-2 border">Aksi</th>
                <th className="px-4 py-2 border">NPWP Pembeli</th>
                <th className="px-4 py-2 border">Nama Pembeli</th>
                <th className="px-4 py-2 border">Kode Transaksi</th>
                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                <th className="px-4 py-2 border">Masa Pajak</th>
                <th className="px-4 py-2 border">Tahun</th>
                <th className="px-4 py-2 border">Status Faktur</th>
                <th className="px-4 py-2 border">ESignStatus</th>
                <th className="px-4 py-2 border">
                  Harga Jual / Penggantian / DPP (Rp)
                </th>
                <th className="px-4 py-2 border">DPP Nilai Lain / DPP (Rp)</th>
                <th className="px-4 py-2 border">PPN (Rp)</th>
                <th className="px-4 py-2 border">PPnMB (Rp)</th>
                <th className="px-4 py-2 border">Penandatanganan</th>
                <th className="px-4 py-2 border">Referensi</th>
                <th className="px-4 py-2 border">Dilaporkan Oleh Pengguna</th>
                <th className="px-4 py-2 border">
                  Dilaporkan Oleh Pemungut PPN
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-1 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() =>
                          navigate(
                            `/praktikum/${id}/sistem/${akun}/retur-faktur/pdf/${item.id}`
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Lihat PDF
                      </button>
                    </td>

                    <td className="px-4 py-2 border">
                      {item.akun_penerima_id?.npwp_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.akun_penerima_id?.nama_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.kode_transaksi || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.nomor_faktur_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.masa_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">{item.tahun || "-"}</td>
                    <td className="px-4 py-2 border">{item.status || "-"}</td>
                    <td className="px-4 py-2 border">
                      {item.esign_status || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.dpp || "-")}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.dpp_lain_retur || "-")}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.ppn_retur || "-")}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.ppnbm_retur || "-")}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.penandatangan || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.referensi || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.dilaporkan_oleh_penjual ? "Ya" : "Tidak"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.dilaporkan_oleh_pemungut_ppn ? "Ya" : "Tidak"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={18} className="text-center py-4">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReturFakturMasukan;
