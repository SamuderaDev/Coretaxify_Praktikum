import React from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useParams } from "react-router";

const DashboardEFaktur = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const pieData = {
    labels: [
      "test (17%)",
      "4 (33%)",
      "6 (50%)",
      "8 (67%)",
      "10 (83%)",
      "12 (100%)",
    ],
    datasets: [
      {
        data: [2, 4, 6, 8, 10, 12],
        backgroundColor: [
          "#28A745",
          "#007BFF",
          "#6C757D",
          "#FFC107",
          "#DC3545",
          "#17A2B8",
        ],
        hoverBackgroundColor: [
          "#218838",
          "#0056B3",
          "#5A6268",
          "#E0A800",
          "#C82333",
          "#138496",
        ],
      },
    ],
  };

  const barData = {
    labels: ["NORMAL"],
    datasets: [
      {
        label: "PPN",
        data: [60000000],
        backgroundColor: "#264de4",
      },
      {
        label: "PPnBM",
        data: [-20000000],
        backgroundColor: "#6C757D",
      },
    ],
  };

  return (
    <div className="flex h-screen">
      {/* badan */}
      <SideBarEFaktur
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id: id, akun: akun }}
      />
      <div className="flex-1 p-3  h-[100%] w-[100%]">
        <div className="bg-blue-900 text-white p-4 rounded-md mb-5 w-full">
          <h2 className="text-xl font-bold">Dasbor e-Faktur</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-6 ">
          <div className="bg-gray-100 p-4 rounded-md shadow h-[100%]">
            <h3 className="font-bold mb-3">Dasbor Faktur Pajak</h3>
            <div className="h-[90%]">
              <Pie data={pieData} className="mb-2 h-[90%]" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow ">
            <h3 className="font-bold mb-3">
              Dasbor Pembayaran dan Pelaporan PPN
            </h3>
            <Bar data={barData} />
          </div>
        </div>
        {/* <div className="bg-white p-4 rounded-md shadow w-[90%]">
                    <h3 className="font-bold mb-3">Pembayaran Sebelum Pengisian Dasbor</h3>
                    <table className="border-collapse w-[80%]">
                        <thead>
                            <tr className="bg-yellow-400 text-left">
                                <th className="p-2">Jenis Pembayaran</th>
                                <th className="p-2">Nilai</th>
                                <th className="p-2">Referensi</th>
                                <th className="p-2">Kode Pembayaran</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2" colSpan="4">Tidak ada data untuk ditampilkan.</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
      </div>
    </div>
  );
};

export default DashboardEFaktur;
