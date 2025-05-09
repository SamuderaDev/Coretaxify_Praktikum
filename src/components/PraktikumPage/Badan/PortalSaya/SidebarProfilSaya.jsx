import React from "react";
import { Link } from "react-router-dom";
import { useUserType } from "../../../context/userTypeContext";

const SidebarProfilSayaBadan = ({ nama_akun, npwp_akun, akun }) => {
  const { userType } = useUserType();
  const userTypeId = userType === "Orang Pribadi" ? 1 : 2;

  // const menuItems = [
  //     "Ikhtisar Profil Wajib Pajak",
  //     "Informasi Umum",
  //     "Alamat",
  //     "Detail Kontak",
  //     "Pihak Terkait",
  //     "Objek Pajak Bumi dan Bangunan (PBB)",
  //     "Klasifikasi Lapangan Usaha (KLU)",
  //     "Detail Bank",
  //     "Data Unit Keluarga",
  //     "Tempat Kegiatan Usaha/Sub Unit",
  //     "Nomor Identifikasi Eksternal",
  //     "Jenis Pajak",
  //     "Wakil Kuasa Saya",
  //     "Wajib Pajak yang Diwakili",
  //     "Verifikasi Dua Langkah",
  //     "Permohonan Tertunda",
  //     "Semua Permohonan"
  // ];
  const menuItems = [
    {
      label: "Ikhtisar Profil Wajib Pajak",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/profil-saya`,
    },
    {
      label: "Informasi Umum",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/informasi-umum`,
    },
    {
      label: "Alamat",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/alamat`,
    },
    {
      label: "Detail Kontak",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/detail-kontak`,
    },
    {
      label: "Pihak Terkait",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/pihak-terkait`,
    },
    {
      label: "Objek Pajak Bumi dan Bangunan (PBB)",
      link: `/admin/praktikum/${userTypeId}/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)`,
    },
    {
      label: "Klasifikasi Lapangan Usaha (KLU)",
      link: `/admin/praktikum/${userTypeId}/profil-saya/klasifikasi-lapangan-usaha-(klu)`,
    },
    {
      label: "Detail Bank",
      link: `/admin/praktikum/${userTypeId}/profil-saya/detail-bank`,
    },
    {
      label: "Data Unit Keluarga",
      link: `/admin/praktikum/${userTypeId}/profil-saya/data-unit-keluarga`,
    },
    {
      label: "Tempat Kegiatan Usaha/Sub Unit",
      link: `/admin/praktikum/${userTypeId}/profil-saya/tempat-kegiatan-usaha/sub-unit`,
    },
    {
      label: "Nomor Identifikasi Eksternal",
      link: `/admin/praktikum/${userTypeId}/profil-saya/nomor-identifikasi-eksternal`,
    },
    {
      label: "Jenis Pajak",
      link: `/admin/praktikum/${userTypeId}/profil-saya/jenis-pajak`,
    },
    {
      label: "Wakil Kuasa Saya",
      link: `/admin/praktikum/${userTypeId}/profil-saya/wakil-kuasa-saya`,
    },
    {
      label: "Wajib Pajak yang Diwakili",
      link: `/admin/praktikum/${userTypeId}/profil-saya/wajib-pajak-yang-diwakili`,
    },
    {
      label: "Verifikasi Dua Langkah",
      link: `/admin/praktikum/${userTypeId}/profil-saya/verifikasi-dua-langkah`,
    },
    {
      label: "Permohonan Tertunda",
      link: `/admin/praktikum/${userTypeId}/profil-saya/permohonan-tertunda`,
    },
    {
      label: "Semua Permohonan",
      link: `/admin/praktikum/${userTypeId}/profil-saya/semua-permohonan`,
    },
  ];

  return (
    <aside className="w-1/6 text-blue-900 px-5 py-5 h-screen bg-white">
      <div className="mb-5 bg-blue-900 text-white p-2 text-center">
        <h2 className="text-lg font-bold mb-5">{npwp_akun}</h2>{" "}
        {/* Dari akun yang login */}
        <h3 className="text-md font-semibold mb-5">{nama_akun}</h3>{" "}
        {/* Dari akun yang login */}
      </div>

      <nav>
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            // const formattedItem = item.replace(/ /g, "-").toLowerCase();
            // const linkPath =
            //   index === 0
            //     ? `/admin/praktikum/${userTypeId}/profil-saya`
            //     : `/admin/praktikum/${userTypeId}/profil-saya/${formattedItem}`;

            const isActive = location.pathname === item.link;

            return (
              <li
                key={index}
                className={`p-2 rounded-md cursor-pointer ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`}
              >
                <Link to={item.link} className="block w-full p-2">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarProfilSayaBadan;
