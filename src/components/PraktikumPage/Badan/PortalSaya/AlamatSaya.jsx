import React, { useState } from "react";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";
import { BsFiletypeXls } from "react-icons/bs";
import { useParams } from "react-router";

const AlamatSayaBadan = ({ data, sidebar }) => {
  const [alamat, setAlamat] = useState({
    alamat: "Jl. Raya Ciputat Parung No. 1",
    kelurahan: "Ciputat Timur",
    kecamatan: "Ciputat",
    kota: "Tangerang Selatan",
    provinsi: "Banten",
    kodePos: "15111",
  });
  const { id, akun } = useParams();

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSayaBadan
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />

      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <h2 className="text-2xl font-semibold">Alamat</h2>
        <div className="spcae-y-2 h-full mt-4">
          <h1 className="text-lg font-semibold">Alamat Utama</h1>
          <p className="mt-2">Detail Alamat Utama : {data.alamat_utama_akun}</p>
        </div>
      </div>
    </div>
  );
};
export default AlamatSayaBadan;
