import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserType } from "../../../context/UserTypeContext";

const SideBarEFakturOP = ({ nama_akun, npwp_akun, akun }) => {
  const { userType } = useUserType();
  const location = useLocation(); // ambil path sekarang
  const userTypeId = userType === "Orang Pribadi" ? 1 : 2;
  // praktikum/1/sistem/2/e-faktur
  const efakturItems = [
    {
      label: "Pajak Keluaran",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/e-faktur/pajak-keluaran`,
    },
    {
      label: "Pajak Masukan",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/e-faktur/pajak-masukan`,
    },
    {
      label: "Retur Pajak Keluaran",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/e-faktur/retur-pajak-keluaran`,
    },
    {
      label: "Retur Pajak Masukan",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/e-faktur/retur-pajak-masukan`,
    },
  ];

  const dokumenLainItems = [
    { label: "Pajak Keluaran", link: "pajak-keluaran" },
    { label: "Pajak Masukan", link: "pajak-masukan" },
    {
      label: "Retur Dokumen Lain Keluaran",
      link: "retur-dokumen-lain-keluaran",
    },
    { label: "Retur Dokumen Lain Masukan", link: "retur-dokumen-lain-masukan" },
  ];

  const dashboardPath = `/admin/praktikum/${userTypeId}/e-faktur`;
  const isDashboard = location.pathname === dashboardPath;

  return (
    <aside className="w-1/6 text-blue-900 px-5 py-5 h-screen bg-white">
      <div className="mb-5 bg-blue-900 text-white p-2 text-center">
        <h2 className="text-lg font-bold mb-5">{npwp_akun}</h2>
        <h3 className="text-md font-semibold mb-5">{nama_akun}</h3>
      </div>
      <nav>
        <ul className="space-y-1">
          <li
            className={`p-2 rounded-md cursor-pointer ${
              isDashboard
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-700 hover:text-white"
            }`}
          >
            <Link to={dashboardPath} className="block w-full p-2">
              <strong>Dashboard</strong>
            </Link>
          </li>

          <li className="font-bold text-lg mt-4 mb-2 text-start">e-Faktur</li>
          {efakturItems.map((item, index) => {
            // const formattedItem = item.replace(/ /g, "-").toLowerCase();
            // const path = `/admin/praktikum/${userTypeId}/e-faktur/${formattedItem}`;
            console.log(location.pathname, item.link);
            const isActive = location.pathname.includes(`/${item.link}`);

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

          <li className="font-bold text-lg mt-4 mb-2">Dokumen Lain</li>
          {dokumenLainItems.map((item, index) => {
            // const formattedItem = item.replace(/ /g, "-").toLowerCase();
            // const path = `/admin/praktikum/${userTypeId}/e-faktur/dokumen-lain/${formattedItem}`;
            const isActive = location.pathname.includes(`/${item.link}`);

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

export default SideBarEFakturOP;
